const axios = require('axios');
const util = require('util');
const covid = require('novelcovid');

const all = async () => {
	return await covid.all();
};

const country = async country => {
	try {
		let data = await covid.countries(country);
		return data;
	} catch (err) {
		throw err;
	}
};

module.exports = {
	all: all,
	country: country
};
