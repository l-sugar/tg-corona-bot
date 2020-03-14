const axios = require('axios');
const util = require('util');
const covid = require('novelcovid');

const all = async () => {
	return await covid.all();
};

const country = async country => {
	let data = await covid.countries();
	for (let entry of data) {
		if (entry.country.toLowerCase() === country.toLowerCase()) {
			return entry;
		}
	}
};

module.exports = {
	all: all,
	country: country
};
