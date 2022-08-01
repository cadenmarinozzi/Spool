function toTitleCase(str) {
	return str.replace(/\w\S*/g, function (txt) {
		return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
	});
}

function debounce(func, timeout = 300) {
	let timer;

	return (...args) => {
		clearTimeout(timer);

		timer = setTimeout(() => {
			func.apply(this, args);
		}, timeout);
	};
}

export { toTitleCase, debounce };
