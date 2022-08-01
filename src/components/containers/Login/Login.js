import Button from '../../shared/Button';
import { Component } from 'react';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { setCookie } from '../../../modules/utils/cookies';
import { spotifyConfig } from '../../../modules/utils/constants';
import './Login.scss';

class Login extends Component {
	constructor() {
		super();

		if (window.location.hash) {
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
		}
	}

	handleLogin() {
		window.location = `https://accounts.spotify.com/authorize?client_id=${
			spotifyConfig.clientId
		}&redirect_uri=${'http://localhost:3000/redirect'}&scope=${spotifyConfig.scopes.join(
			'%20'
		)}&response_type=token&show_dialog=true`;
	}

	render() {
		return (
			<div className="center login glass">
				<div className="login-header">
					<h1 className="login-title">Login</h1>
					<FontAwesomeIcon icon={faUser} className="icon" />
				</div>
				<Button
					customIcon={
						<i className="fa fa-spotify icon spotify-icon" />
					}
					onClick={this.handleLogin}>
					Spotify Login
				</Button>
			</div>
		);
	}
}

export default Login;
