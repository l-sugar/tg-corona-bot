const fetch = require('node-fetch');
const util = require('util');

let data = () => {
	fetch('https://coronavirus-tracker-api.herokuapp.com/v2/locations')
		.then(result => result.json())
		.then(res => console.log(res))
		.catch(err => console.error(err));
};
data();
