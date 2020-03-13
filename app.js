const express = require('express');
const axios = require('axios').default;
const dotenv = require('dotenv').config();
const morgan = require('morgan');

const data = require('./data');
const bot = require('./bot').bot;

const app = express();

app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
	let result = await data.fullDataSet();
	console.log(result);
	res.send(result);
});

app.listen(3000, (req, res, next) => {
	console.log('Server listening on port 3000');
});
