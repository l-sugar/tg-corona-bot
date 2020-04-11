const database = require('./database');
const fetch = require('node-fetch');
const moment = require('moment');

const populateDataToDatabase = () => {
	const data = async () => {
		return await fetch('https://corona.lmao.ninja/countries');
	};

	data()
		.then(result => {
			return result.json();
		})
		.then(async result => {
			await result.forEach(async country => {
				let countryData = {
					countryName: country.country,
					id: country.countryInfo._id,
					totalCases: country.cases,
					totalDeaths: country.deaths,
					totalRecovered: country.recovered,
					active: country.active,
					critical: country.critical,
					todayCases: country.todayCases,
					todayDeaths: country.todayDeaths,
					casesPerMillion: country.casesPerOneMillion,
					deathsPerMillion: country.deathsPerOneMillion,
					dataUpdated: moment(country.updated).format('YYYY-MM-DD hh:mm:ss')
				};
				console.log(countryData);
				return await database.insertCountryDataIntoDatabase(countryData);
			});
		})
		.catch(e => console.error(`Error parsing countryData into Database: ${e}`));
};

populateDataToDatabase();

module.exports = {
	populateDataToDatabase: populateDataToDatabase
};
