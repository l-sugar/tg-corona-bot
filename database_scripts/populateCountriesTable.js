const dotenv = require('dotenv').config();
const { Pool, Client } = require('pg');
const fetch = require('node-fetch');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

const data = async () => {
	return await fetch('https://corona.lmao.ninja/countries');
};

const query =
	'INSERT INTO "countries" (id, "countryName", "countryCode-ISO2", "countryCode-ISO3", flag) values ($1, $2, $3, $4, $5)';

data()
	.then(result => result.json())
	.then(res =>
		res.forEach(country => {
			let values = [
				country.countryInfo._id,
				country.country,
				country.countryInfo.iso2,
				country.countryInfo.iso3,
				country.countryInfo.flag
			];
			pool
				.query(query, values)
				.then(res =>
					console.log(`added country to database: ${country.country}`)
				)
				.catch(e =>
					console.error(
						`Error when trying to add country to DB: ${country.country}`
					)
				);
		})
	);
