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
	console.log(
		`have received country, now passing into covid package: ${country}`
	);
	covid
		.countries(country)
		.then(data => {
			console.log(`have received data: ${util.inspect(data)}`);
			return data;
		})
		.catch(err => console.error(`ran into error when retrieving data: ${err}`));
};

module.exports = {
	all: all,
	country: country
};
