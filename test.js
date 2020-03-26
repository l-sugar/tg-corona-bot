const covid = require('novelcovid');
const fetch = require('node-fetch');
const util = require('util');

let data = async () => {
	try {
		fetch('https://corona.lmao.ninja/countries/germany')
			.then(data => data.json())
			.then(result => console.log(`result: ${result.cases}`))
			.catch(err => console.log(err));
		//let result = await fetch('https://corona.lmao.ninja/countries/germany');
		//console.log(`result: ${await result.json()}`);
	} catch (err) {
		console.log(err);
	}
};

data();
