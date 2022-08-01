import Home from './components/pages/Home';
import Finder from './components/pages/Finder';
import Search from './components/pages/Search';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Component } from 'react';
import Login from './components/pages/Login';
import { getCookie, setCookie } from './modules/utils/cookies';
import Spotify from './modules/web/spotify/spotify';
import './fonts.js';
import './App.scss';

class App extends Component {
	constructor() {
		super();

		const loginDetails = window.location.hash
			.substring(1)
			.split('&')
			.reduce((original, item) => {
				if (!item) return;

				const [key, value] = item.split('=');
				original[key] = decodeURIComponent(value);

				return original;
			}, {});

		if (loginDetails) {
			window.location.hash = '';

			setCookie('accessToken', loginDetails.access_token);
			setCookie('loggedIn', true);
		}

		if (getCookie('loggedIn')) {
			this.spotify = new Spotify();
		}
	}

	async componentDidMount() {
		if (!this.spotify || (await this.spotify.checkAccessTokenExpired())) {
			setCookie('loggedIn', null);
		}
	}

	render() {
		return getCookie('loggedIn') ? (
			<Router>
				<Routes>
					<Route path="*" element={<Home />} />
					<Route path="/finder" element={<Finder />} />
					<Route path="/search" element={<Search />} />
				</Routes>
			</Router>
		) : (
			<Login />
		);
	}
}

export default App;
