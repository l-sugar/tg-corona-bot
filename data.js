const axios = require('axios');
const util = require('util');
const covid = require('novelcovid');

const all = async () => {
	await covid.all();
};

const country = async country => {
	let data = await covid.countries();
	for (let entry of data) {
		if (entry.country === country) {
			return entry;
		}
	}
};

module.exports = {
	all: all,
	country: country
};
