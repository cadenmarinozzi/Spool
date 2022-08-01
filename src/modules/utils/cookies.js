function setCookie(name, value) {
	document.cookie = `${name}=${value}`;
}

// Gross function, horribly wrote, why did I do this...
function getCookie(name) {
	let cookies = document.cookie.split('; ');

	for (const cookie of cookies) {
		let [key, value] = cookie.split('=');

		if (key === name) {
			if (value === 'true' || value === 'false' || value === 'null') {
				value = value === 'true';
			}

			return value;
		}
	}
}

export { setCookie, getCookie };
