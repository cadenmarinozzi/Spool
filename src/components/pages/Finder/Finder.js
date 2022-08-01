import { Component, createRef } from 'react';
import { getCookie } from '../../../modules/utils/cookies';
import Spotify from '../../../modules/web/spotify';
import { setCookie } from '../../../modules/utils/cookies';
import Navbar from '../../containers/Navbar';
import './Finder.scss';

class Finder extends Component {
	constructor() {
		super();

		if (getCookie('loggedIn')) {
			this.spotify = new Spotify();
		}

		this.state = {
			canvasRef: createRef(),
		};
	}

	handleLogout() {
		setCookie('loggedIn', null);
		setCookie('accessToken', null);
		window.location.reload();
	}

	async componentDidMount() {
		if (!this.spotify) return;

		const data = await this.spotify.getSongData();

		const canvas = this.state.canvasRef.current;
		const ctx = canvas.getContext('2d');

		canvas.width = canvas.parentElement.getBoundingClientRect().width;
		canvas.height = canvas.parentElement.getBoundingClientRect().height;

		let width = canvas.width;
		let height = canvas.height;

		function resize() {
			canvas.width = canvas.parentElement.getBoundingClientRect().width;
			canvas.height = canvas.parentElement.getBoundingClientRect().height;

			width = canvas.width;
			height = canvas.height;
		}

		window.addEventListener('resize', () => {
			resize();
			draw();
		});

		let selectedStart;
		let selectedEnd;
		let mouseDown = false;

		canvas.addEventListener('mousedown', (e) => {
			selectedStart = e.offsetX;

			mouseDown = true;
		});

		canvas.addEventListener('mouseup', (e) => {
			selectedEnd = e.offsetX;
			draw();

			mouseDown = false;
		});

		canvas.addEventListener('mousemove', (e) => {
			if (!mouseDown) return;

			selectedEnd = e.offsetX;
			draw();
		});

		function draw() {
			ctx.clearRect(0, 0, width, height);

			let duration = data.track.duration;

			let segments = data.segments.map((segment) => {
				let loudness = segment.loudness_max;

				return {
					start: segment.start / duration,
					duration: segment.duration / duration,
					loudness: 1 - Math.min(Math.max(loudness, -35), 0) / -35,
				};
			});

			let max = Math.max(...segments.map((segment) => segment.loudness));

			let levels = [];

			for (let i = 0.0; i < 1; i += 0.001) {
				let s = segments.find((segment) => {
					return i <= segment.start + segment.duration;
				});

				levels.push(Math.round((s.loudness / max) * 100) / 100);
			}

			for (let x = 0; x < width; x++) {
				if (x % 4 !== 0) continue;

				const i = Math.ceil(levels.length * (x / width));
				const h = Math.round(levels[i] * height) / 2;

				let portionEnd = selectedEnd;
				let portionStart = selectedStart;

				if (portionEnd <= portionStart) {
					const temp = portionEnd;
					portionEnd = portionStart;
					portionStart = temp;
				}

				ctx.fillStyle =
					x >= portionStart && x <= portionEnd ? '#1DB954' : '#333';
				ctx.fillRect(x, Math.floor(height / 2 - h), 1, Math.floor(h));

				ctx.fillStyle =
					x >= portionStart && x <= portionEnd
						? '#1DB95430'
						: '#33333330';
				ctx.fillRect(x, Math.floor(height / 2), 1, Math.floor(h));
			}
		}

		resize();
		draw();
	}

	render() {
		return (
			<>
				<Navbar />
				<div className="page">
					<div className="segments-container">
						<canvas
							ref={this.state.canvasRef}
							className="segments"
						/>
					</div>
				</div>
			</>
		);
	}
}

export default Finder;
