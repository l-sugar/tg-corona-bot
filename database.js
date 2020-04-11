const dotenv = require('dotenv').config();
const { Pool, Client } = require('pg');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

const insertUserIntoDatabase = async telegramUser => {
	const query = {
		text:
			'INSERT INTO "telegramUsers" ("telegramUserId", "telegramUsername", "firstName") VALUES ($1, $2, $3) RETURNING *',
		values: [telegramUser.id, telegramUser.username, telegramUser.firstname]
	};
	pool.query(query, (err, res) => {
		if (err) {
			console.error(`ERROR: Unable to add user to database - ${err.detail}`);
		}
	});
};

const findTelegramUserByTelegramUserId = async id => {
	const query = {
		text: 'SELECT * FROM "telegramUsers" WHERE "telegramUserId" = $1 LIMIT 1',
		values: [id]
	};
	pool.query(query, (err, res) => {
		if (err) {
			console.error(err);
		} else {
			console.log(`retrieved user from database: ${res.rows[0]}`);
		}
	});
};

const insertCountryDataIntoDatabase = async countryData => {
	const query = {
		text:
			'INSERT INTO "countryData" ("countryId", "totalCases", "totalDeaths", "totalRecovered", "active", "critical", "todayCases", "todayDeaths", "casesPerMillion", "deathsPerMillion", "dataUpdated") values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)',
		values: [
			countryData.id,
			countryData.totalCases,
			countryData.totalDeaths,
			countryData.totalRecovered,
			countryData.active,
			countryData.critical,
			countryData.todayCases,
			countryData.todayDeaths,
			countryData.casesPerMillion,
			countryData.deathsPerMillion,
			countryData.dataUpdated
		]
	};
	pool
		.query(query)
		.then(res => console.log(res.rows[0]))
		.catch(e =>
			console.error(
				`ERROR: Unable to insert into countryData table: ${countryData.countryName} - ${e}`
			)
		);
};

module.exports = {
	insertUserIntoDatabase: insertUserIntoDatabase,
	findTelegramUserByTelegramUserId: findTelegramUserByTelegramUserId,
	insertCountryDataIntoDatabase: insertCountryDataIntoDatabase
};
