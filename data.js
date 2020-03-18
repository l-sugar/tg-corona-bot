const axios = require('axios');
const util = require('util');
const covid = require('@louis.sugar/covid19');

const all = async () => {
	return await covid.all();
};

const country = async country => {
	let data = await covid.countries(country);
	if (data) {
		return data;
	} else {
		return false;
	}
};

module.exports = {
	all: all,
	country: country
};
