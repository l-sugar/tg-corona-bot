const axios = require('axios');
const util = require('util');
const fetch = require('node-fetch');
const covid = require('novelcovid');

const all = async () => {
	try {
		let data = await covid.all();
		return data.json();
	} catch (err) {
		console.error(err);
	}
};

const country = async country => {
	try {
		let data = await covid.countries(country);
		return data.json();
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	all: all,
	country: country
};
