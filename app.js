const express = require('express');
const axios = require('axios').default;
const dotenv = require('dotenv').config();
const morgan = require('morgan');

const data = require('./data');
const bot = require('./bot').bot;

const PORT = process.env.PORT || 3000;

const app = express();

app.use(morgan('dev'));

app.listen(PORT, (req, res, next) => {
	console.log(`Server listening on port ${PORT}`);
});
