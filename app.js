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
- display historical data in the bot responses
- more bot commands:
 - world
 - 
- create frontend to get the data via url


*/
