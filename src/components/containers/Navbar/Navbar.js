import { Link } from 'react-router-dom';
import { setCookie } from '../../../modules/utils/cookies';
import { Component } from 'react';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import Button from '../../shared/Button';
import './Navbar.scss';

class Navbar extends Component {
	handleLogout() {
		setCookie('loggedIn', null);
		setCookie('accessToken', null);
		window.location.reload();
	}

	render() {
		return (
			<div className="navbar">
				<div className="navbar-header">
					<h1 className="title">Spool</h1>
					<div className="navbar-links">
						<Link to="/" className="navbar-link">
							Home
						</Link>
						<Link to="/finder" className="navbar-link">
							Finder
						</Link>
						<Link to="/search" className="navbar-link">
							Search
						</Link>
					</div>
				</div>
				<div className="logout-button">
					<Button
						rightIcon={faArrowRightFromBracket}
						onClick={this.handleLogout}>
						Logout
					</Button>
				</div>
			</div>
		);
	}
}

export default Navbar;
