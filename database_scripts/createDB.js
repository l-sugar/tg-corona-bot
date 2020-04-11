const dotenv = require('dotenv').config();
const { Pool, Client } = require('pg');

const pool = new Pool({
	connectionString: process.env.DATABASE_URL
});

const countriesTable = `
CREATE TABLE IF NOT EXISTS "countries" (
    "id" INTEGER PRIMARY KEY,
    "countryName" VARCHAR(128) UNIQUE,
    "countryCode-ISO2" VARCHAR(32) UNIQUE,
    "countryCode-ISO3" VARCHAR(32) UNIQUE,
    "flag" TEXT
)
`;

const countryDataTable = `
CREATE TABLE IF NOT EXISTS "countryData" (
    "countryId" SERIAL PRIMARY KEY REFERENCES countries(id),
    "createdAt" TIMESTAMP DEFAULT NOW(),
    "lastUpdatedAt" TIMESTAMP DEFAULT NOW(),
    "totalCases" INTEGER,
    "totalDeaths" INTEGER,
    "totalRecovered" INTEGER,
    "active" INTEGER,
    "critical" INTEGER,
    "todayCases" INTEGER,
    "todayDeaths" INTEGER,
    "casesPerMillion" REAL,
    "deathsPerMillion" REAL,
    "dataUpdated" TIMESTAMP
)
`;

const telegramUsersTable = `
CREATE TABLE IF NOT EXISTS "telegramUsers" (
    id SERIAL PRIMARY KEY,
    "createdAt" TIMESTAMP NOT NULL DEFAULT NOW(),
    "telegramUserId" VARCHAR(128) NOT NULL,
    "telegramUsername" VARCHAR(128),
    "firstName" VARCHAR(128),
    "dailyReport" BOOLEAN DEFAULT FALSE,
    "dailyReportCountries" INTEGER []
)
`;
pool
	.query(countriesTable)
	.then(res => {
		console.log('created countries table in DB');
	})
	.catch(e => console.error(`Could not create countries table: ${e.stack}`));

pool
	.query(countryDataTable)
	.then(res => {
		console.log('created countryData table in DB');
	})
	.catch(e => console.error(`Could not create countryData table: ${e.stack}`));

pool
	.query(telegramUsersTable)
	.then(res => {
		console.log('created telegramUsers table in DB');
	})
	.catch(e =>
		console.error(`Could not create telegramUsers table: ${e.stack}`)
	);
