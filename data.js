const axios = require('axios');
const util = require('util');
const fetch = require('node-fetch');
const covid = require('novelcovid');

const all = async () => {
	fetch('https://corona.lmao.ninja/all')
		.then(data => data.json())
		.then(result => {
			return result;
		});
};

const country = country => {
	if (!country) {
		return await fetch(`https://corona.lmao.ninja/countries`)
			.then(data => data.json())
			.then(result => {
				return result;
			})
			.catch(err => console.error(err));
	}
	return await fetch(`https://corona.lmao.ninja/countries/${country}`)
		.then(data => data.json())
		.then(result => {
			return result;
		})
		.catch(err => console.error(err));
};

module.exports = {
	all: all,
	country: country
};
