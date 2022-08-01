import { Component, createRef } from 'react';
import { getCookie } from '../../../modules/utils/cookies';
import Spotify from '../../../modules/web/spotify';
import Input from '../../shared/Input';
import { setCookie } from '../../../modules/utils/cookies';
import RangeSlider from '../../shared/RangeSlider';
import {
	faCompactDisc,
	faMusic,
	faMagnifyingGlass,
	faPersonWalking,
	faArrowUpRightFromSquare,
	faFireFlameCurved,
	faHeartPulse,
	faChartLine,
	faBolt,
	faAnglesUp,
	faArrowUp,
	faClock,
	faGuitar,
} from '@fortawesome/free-solid-svg-icons';
import Navbar from '../../containers/Navbar';
import Button from '../../shared/Button';
import Table from '../../shared/Table';
import './Search.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { debounce } from '../../../modules/utils/methods';

class Search extends Component {
	constructor() {
		super();

		if (getCookie('loggedIn')) {
			this.spotify = new Spotify();
		}

		this.state = {
			playingPreview: false,
			songNameRef: createRef(),
			genreRef: createRef(),
			minEnergy: 0,
			maxEnergy: 1,
			minDanceability: 0,
			maxDanceability: 1,
			minLiveness: 0,
			maxLiveness: 1,
			minPopularity: 0,
			maxPopularity: 1,
			minDuration: 0,
			maxDuration: 1,
			minAcousticness: 0,
			maxAcousticness: 1,
		};
	}

	handleLogout() {
		setCookie('loggedIn', null);
		setCookie('accessToken', null);

		window.location.reload();
	}

	async handleSearch() {
		if (!this.spotify) return;

		const results = await this.spotify.recommendSong({
			songNames: [
				await this.spotify.getSongId(this.state.searchSongName),
			],
			genres: [this.state.searchGenre],
			minEnergy: this.state.minEnergy,
			maxEnergy: this.state.maxEnergy,
			minDanceability: this.state.minDanceability,
			maxDanceability: this.state.maxDanceability,
			minLiveness: this.state.minLiveness,
			maxLiveness: this.state.maxLiveness,
			minDuration: this.state.minDuration,
			maxDuration: this.state.maxDuration,
			minPopularity: this.state.minPopularity,
			maxPopularity: this.state.maxPopularity,
			minAcousticness: this.state.minAcousticness,
			maxAcousticness: this.state.maxAcousticness,
		});

		if (this.state.playingPreview) {
			this.state.previewAudio.pause();

			this.setState({
				results: results.tracks,
				previewAudio: null,
				playingPreview: false,
			});
		}

		this.setState({
			results: results.tracks,
		});
	}

	async handleSongPreviews() {
		const songPreviews = await this.spotify.getSongs(this.state.songName);

		this.setState({
			songPreviews: songPreviews,
		});
	}

	async handleGenrePreviews() {
		const genres = await this.spotify.getGenres();

		if (!genres) return;

		this.setState({
			genrePreviews: genres.filter((genre) =>
				genre.includes(this.state.genre)
			),
		});
	}

	render() {
		return (
			<>
				<Navbar />
				<div className="page">
					<div className="search-bar">
						<Input
							inputRef={this.state.songNameRef}
							text="Song Name"
							placeholder="Enter Song Name"
							icon={faCompactDisc}
							onInput={debounce((songName) => {
								this.setState(
									{
										songName: songName,
									},
									this.handleSongPreviews.bind(this)
								);
							}, 200)}
						/>
						{this.state.songPreviews && (
							<div className="song-previews-container">
								{this.state.songPreviews
									.slice(0, 5)
									.map((songPreview, index) => {
										return (
											<div
												className="song-preview"
												key={index}
											>
												<img
													className="song-preview-image"
													src={
														songPreview.album
															.images[0].url
													}
												/>
												<button
													className="song-preview-content"
													onClick={() => {
														this.state.songNameRef.current.value =
															songPreview.name;
														this.setState({
															searchSongName:
																songPreview.name,
															songPreviews: null,
														});
													}}
												>
													<div className="song-preview-info">
														<h1 className="song-preview-info-title">
															{songPreview.name}
														</h1>
														<h3 className="song-preview-info-artist">
															-
															{
																songPreview
																	.artists[0]
																	.name
															}
														</h3>
													</div>
												</button>
											</div>
										);
									})}
							</div>
						)}
						<Input
							text="Genre"
							inputRef={this.state.genreRef}
							placeholder="Enter Genre"
							icon={faMusic}
							onInput={(genre) => {
								this.setState(
									{
										genre: genre,
									},
									this.handleGenrePreviews.bind(this)
								);
							}}
						/>
						{this.state.genrePreviews && (
							<div className="genre-previews-container">
								{this.state.genrePreviews
									.slice(0, 5)
									.map((genrePreview, index) => {
										return (
											<div
												className="genre-preview"
												key={index}
											>
												<button
													className="genre-preview-content"
													onClick={() => {
														this.state.genreRef.current.value =
															genrePreview;
														this.setState({
															searchGenre:
																genrePreview,
															genrePreviews: null,
														});
													}}
												>
													<div className="genre-preview-info">
														<h1 className="genre-preview-info-title">
															{genrePreview}
														</h1>
													</div>
												</button>
											</div>
										);
									})}
							</div>
						)}
						<div className="song-settings-container">
							<RangeSlider
								min={0}
								max={100}
								icon={faBolt}
								text="Energy"
								onChange={(minValue, maxValue) => {
									this.setState({
										minEnergy: minValue / 100,
										maxEnergy: maxValue / 100,
									});
								}}
							/>
							<RangeSlider
								min={0}
								max={100}
								text="Danceability"
								icon={faPersonWalking}
								onChange={(minValue, maxValue) => {
									this.setState({
										minDanceability: minValue / 100,
										maxDanceability: maxValue / 100,
									});
								}}
							/>
							<RangeSlider
								min={0}
								max={100}
								text="Liveness"
								icon={faFireFlameCurved}
								onChange={(minValue, maxValue) => {
									this.setState({
										minLiveness: minValue / 100,
										maxLiveness: maxValue / 100,
									});
								}}
							/>
							<RangeSlider
								min={0}
								max={100}
								text="Popularity"
								icon={faAnglesUp}
								onChange={(minValue, maxValue) => {
									this.setState({
										minPopularity: minValue,
										maxPopularity: maxValue,
									});
								}}
							/>
							<RangeSlider
								min={0}
								max={60}
								text="Duration (min)"
								icon={faClock}
								onChange={(minValue, maxValue) => {
									// ms
									this.setState({
										minDuration: minValue * 60000,
										maxDuration: maxValue * 60000,
									});
								}}
							/>
							<RangeSlider
								min={0}
								max={100}
								text="Acousticness"
								icon={faGuitar}
								onChange={(minValue, maxValue) => {
									this.setState({
										minAcousticness: minValue / 10,
										maxAcousticness: maxValue / 10,
									});
								}}
							/>
						</div>
						<div className="search-submit">
							<Button
								icon={faMagnifyingGlass}
								onClick={this.handleSearch.bind(this)}
								small
							>
								Search
							</Button>
						</div>
					</div>
					<div className="results-container">
						{this.state.results && (
							<Table
								items={this.state.results.map(
									(result, index) => {
										const previewing =
											this.state.playingPreview &&
											this.state.previewSong ===
												result.name;
										return (
											<div
												className="result-item"
												key={index}
											>
												<div className="result-item-contents">
													<h2 className="result-position">
														{index + 1}.{' '}
													</h2>
													<a
														target="_blank"
														rel="noopener noreferrer"
														href={
															result.external_urls
																.spotify
														}
													>
														<FontAwesomeIcon
															className="result-link-icon"
															icon={
																faArrowUpRightFromSquare
															}
														/>
													</a>
													{previewing && (
														<div className="music-bars">
															<span className="music-bar" />
															<span className="music-bar" />
															<span className="music-bar" />
														</div>
													)}
													<button
														className="result-item-info"
														onClick={() => {
															if (
																this.state
																	.playingPreview
															) {
																this.state.previewAudio.pause();

																if (
																	this.state
																		.previewSong ===
																	result.name
																) {
																	this.setState(
																		{
																			playingPreview: false,
																		}
																	);

																	return;
																}
															}

															if (
																!result.preview_url
															) {
																this.setState({
																	playingPreview: false,
																});

																return;
															}

															this.setState({
																playingPreview: true,
																previewSong:
																	result.name,
															});

															const previewAudio =
																new Audio(
																	result.preview_url
																);

															previewAudio.volume = 0.5;
															previewAudio.play();

															previewAudio.addEventListener(
																'ended',
																() => {
																	this.setState(
																		{
																			playingPreview: false,
																		}
																	);
																}
															);

															this.setState({
																previewAudio:
																	previewAudio,
															});
														}}
													>
														<h1
															className={`result-title ${
																previewing
																	? ' playing-result-title'
																	: ''
															}`}
															href={result.href}
														>{`${result.name}`}</h1>
														<h3 className="result-artists">{`- ${result.artists
															.map((artist) => {
																return artist.name;
															})
															.join(', ')}`}</h3>
													</button>
												</div>
											</div>
										);
									}
								)}
							/>
						)}
					</div>
				</div>
			</>
		);
	}
}

export default Search;
