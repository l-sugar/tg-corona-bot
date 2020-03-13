const express = require('express');
const axios = require('axios').default;
const dotenv = require('dotenv').config();
const morgan = require('morgan');

const data = require('./data');
const bot = require('./bot').bot;

const PORT = process.env.port || 3000;

const app = express();

app.use(morgan('dev'));

app.get('/', async (req, res, next) => {
	let result = await data.fullDataSet();
	console.log(result);
	res.send(result);
});

app.listen(PORT, (req, res, next) => {
	console.log('Server listening on port 3000');
});
