const express = require('express');
const axios = require('axios').default;
const dotenv = require('dotenv').config();
const morgan = require('morgan');

const data = require('./data');
const bot = require('./bot').bot;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));

app.get('/ping', (req, res, next) => {
	res.status(200).send('ping received');
});

app.listen(PORT, (req, res, next) => {
	console.log(`Server listening on port ${PORT}`);
});

/* TODO

- connect database
- persist daily data in database (cron jobs)
- add countries table to database
- connect users with countries for daily report
- let them set up daily reports in settings
- create user class to populate when pulling info from database on first request
- add caching with ttl 1 hour (node-cache) to persist user objects
- enable multiple sources (JHU)
- let user choose from different sources
- clean up file struct and add debugging lines (DEBUG ENV var)
- display historical data in the bot responses
- create frontend to get the data via url

JOHN HOPKINS DATA REPO WITH HISTORICAL DATA: https://github.com/CSSEGISandData/COVID-19/


*/
