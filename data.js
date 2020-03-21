const axios = require('axios');
const util = require('util');
const fetch = require('node-fetch');

const all = async () => {
	try {
		let data = fetch('https://corona.lmao.ninja/all');
		return data.json();
	} catch (err) {
		console.error(err);
	}
};

const country = async country => {
	try {
		let data = await fetch(`https://corona.lmao.ninja/countries/${country}`);
		return data.json();
	} catch (err) {
		console.error('error: ' + util.inspect(err));
		return err;
	}
};

module.exports = {
	all: all,
	country: country
};
