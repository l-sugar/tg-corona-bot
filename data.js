const axios = require('axios');
const util = require('util');
const fetch = require('node-fetch');

const all = async () => {
	fetch('https://corona.lmao.ninja/all')
		.then(res => {
			return res.json();
		})
		.catch(err => console.log(err));
};

const country = async country => {
	fetch(`https://corona.lmao.ninja/countries/${country}`)
		.then(res => {
			return res.json();
		})
		.catch(err => {
			return err;
		});
};

module.exports = {
	all: all,
	country: country
};
