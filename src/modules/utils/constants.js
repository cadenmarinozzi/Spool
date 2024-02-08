const spotifyConfig = {
	clientId: 'c5e7636946fb4fb9b85e8c82218037b8',
	scopes: [
		'user-top-read',
		'user-read-currently-playing',
		'user-read-playback-state',
		'user-read-private',
	],
	redirectURI: window.location.href.includes('localhost')
		? 'http://localhost:3000/redirect'
		: 'https://cadenmarinozzi.github.io/Spool',
};

export { spotifyConfig };
