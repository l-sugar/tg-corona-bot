const axios = require('axios');
const util = require('util');
const fetch = require('node-fetch');
const covid = require('novelcovid');

const all = async () => {
	try {
		let data = covid.all();
		return data;
	} catch (err) {
		console.error(err);
	}
};

const country = async country => {
	try {
		let data = covid.countries(country);
		return data;
	} catch (err) {
		console.error(err);
	}
};

module.exports = {
	all: all,
	country: country
};
