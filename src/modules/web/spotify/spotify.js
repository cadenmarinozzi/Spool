import { getCookie, setCookie } from '../../utils/cookies';
import axios from 'axios';

class Spotify {
	constructor() {
		this.headers = {
			Authorization: `Bearer ${getCookie('accessToken')}`,
		};
	}

	async get(url, data) {
		try {
			const response = await axios.get(url, {
				headers: this.headers,
				params: data,
			});

			return response.data;
		} catch (err) {
			if (err.response.status === 401 && getCookie('loggedIn')) {
				setCookie('loggedIn', null);
				window.location.reload();
			}

			return;
		}
	}

	async getTopArtists() {
		const artists = await this.get(
			'https://api.spotify.com/v1/me/top/artists'
		);

		return artists.items;
	}

	async getProfile() {
		return await this.get('https://api.spotify.com/v1/me');
	}

	async getSongData(songId) {
		return await this.get(
			`https://api.spotify.com/v1/audio-analysis/${songId}`
		);
	}

	async getSongId(songName) {
		if (!songName) {
			return;
		}

		const song = await this.get(
			`https://api.spotify.com/v1/search?q=${encodeURIComponent(
				songName
			)}&type=track`
		);

		return song.tracks.items[0].id;
	}

	async getSongs(songName) {
		if (!songName) {
			return;
		}

		const songs = await this.get(
			`https://api.spotify.com/v1/search?q=${encodeURIComponent(
				songName
			)}&type=track`
		);

		return songs.tracks.items;
	}

	async getGenres() {
		const genres = await this.get(
			'https://api.spotify.com/v1/recommendations/available-genre-seeds'
		);

		return genres.genres;
	}

	async recommendSong(query) {
		const songs = await this.get(
			'https://api.spotify.com/v1/recommendations/',
			{
				seed_tracks: query.songNames.join(','),
				seed_genres: query.genre
					? query.genres.join(',').map((genre) => genre.toLowerCase())
					: '',
				limit: 20,
				min_energy: query.minEnergy,
				max_energy: query.maxEnergy,
				min_danceability: query.minDanceability,
				max_danceability: query.maxDanceability,
				min_liveness: query.minLiveness,
				max_liveness: query.maxLiveness,
				min_popularity: query.minPopularity,
				max_popularity: query.maxPopularity,
				min_duration_ms: query.minDuration,
				max_duration_ms: query.maxDuration,
				min_acousticness: query.minAcousticness,
				max_acousticness: query.maxAcousticness,
			}
		);

		return songs;
	}

	async checkAccessTokenExpired() {
		try {
			await this.get('https://api.spotify.com/v1/me');
		} catch (err) {
			if (err.response.status === 401) {
				return true;
			}
		}
	}
}

export default Spotify;
