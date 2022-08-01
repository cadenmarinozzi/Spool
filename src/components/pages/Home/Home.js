import { Component } from 'react';
import Login from '../../containers/Login';
import { getCookie, setCookie } from '../../../modules/utils/cookies';
import Spotify from '../../../modules/web/spotify';
import Table from '../../shared/Table';
import Button from '../../shared/Button';
import Navbar from '../../containers/Navbar';
import { toTitleCase } from '../../../modules/utils/methods';
import './Home.scss';

class Home extends Component {
	constructor() {
		super();

		if (getCookie('loggedIn')) {
			this.spotify = new Spotify();
		}

		this.state = {
			topArtistsExpanded: false,
			topGenresExpanded: false,
		};
	}

	async componentDidMount() {
		if (!this.spotify) return;

		const topArtists = await this.spotify.getTopArtists();
		const profile = await this.spotify.getProfile();
		let genres = {};

		topArtists.forEach((artist) => {
			artist.genres.forEach((genre) => {
				const genreName = toTitleCase(genre);

				if (genres[genreName]) {
					genres[genreName]++;

					return;
				}

				genres[genreName] = 1;
			});
		});

		const topGenres = Object.keys(genres)
			.slice(0, 10)
			.sort((a, b) => genres[b] - genres[a]);

		this.setState({
			topArtists: topArtists,
			profileImage: profile.images[0].url,
			profileName: profile.display_name,
			topGenres: topGenres,
			explicitContent: !profile.explicit_content.filter_enabled,
		});
	}

	render() {
		return (
			<>
				<Navbar />
				<div className="page">
					<div className="profile-header-container">
						<div className="profile-header">
							{this.state.profileImage && (
								<img
									src={this.state.profileImage}
									className="profile-image"
								/>
							)}
							{this.state.profileName && (
								<h1 className="profile-username">
									{this.state.profileName}
									{this.state.explicitContent && (
										<span className="explicit-icon">E</span>
									)}
								</h1>
							)}
						</div>
					</div>
					<div className="home-page-content">
						{this.state.topArtists && (
							<div className="top-container">
								<h1 className="top-title">Top Artists</h1>
								<Table
									items={this.state.topArtists
										.slice(
											0,
											this.state.topArtistsExpanded
												? this.state.topArtists.length
												: 5
										)
										.map((artist, index) => {
											return (
												<div
													className="top-item"
													key={index}>
													<h2 className="top-position">
														{index + 1}.{' '}
													</h2>
													<img
														className="artist-image"
														src={
															artist.images[0].url
														}></img>
													<h2
														className={`artist-username ${
															index == 0
																? 'top-artist-username'
																: ''
														}`}>{`${artist.name}`}</h2>
													<h3 className="top-artist-genres">{`- ${artist.genres.join(
														', '
													)}`}</h3>
												</div>
											);
										})}
								/>
								<button
									className="top-expand"
									onClick={() => {
										this.setState({
											topArtistsExpanded:
												!this.state.topArtistsExpanded,
										});
									}}>
									{this.state.topArtistsExpanded
										? '...less'
										: `+${
												this.state.topArtists.length - 5
										  } more`}
								</button>
							</div>
						)}
						{this.state.topGenres && (
							<div className="top-container">
								<h1 className="top-title">Top Genres</h1>
								<Table
									items={this.state.topGenres
										.slice(
											0,
											this.state.topGenresExpanded
												? this.state.topGenres.length
												: 5
										)
										.map((genre, index) => {
											return (
												<div
													key={index}
													className="top-item">
													<h2 className="top-position">
														{index + 1}.{' '}
													</h2>
													<h2
														className={`genre-name ${
															index === 0
																? 'top-genre-name'
																: ''
														}`}>
														{genre}
													</h2>
												</div>
											);
										})}
								/>
								<button
									className="top-expand"
									onClick={() => {
										this.setState({
											topGenresExpanded:
												!this.state.topGenresExpanded,
										});
									}}>
									{this.state.topGenresExpanded
										? '...less'
										: `+${
												this.state.topGenres.length - 5
										  } more`}
								</button>
							</div>
						)}
					</div>
				</div>
			</>
		);
	}
}

export default Home;
