const telegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv').config();
const util = require('util');

const data = require('./data');
const database = require('./database');
const userCache = require('./user-cache');

const token = process.env.TG_BOT_TOKEN;

const bot = new telegramBot(token, { polling: true });

// Bot Handler Functions

const startHandler = async (chatId, firstName, username) => {
	let telegramUser = {
		id: chatId,
		username: username,
		firstname: firstName
	};

	await database.insertUserIntoDatabase(telegramUser);
	userCache.set(telegramUser.id, telegramUser);
	console.log(`keys in userCache: ${userCache.list()}`);

	bot.sendMessage(
		chatId,
		`Welcome ${firstName}!
        
What country would you like to get up-to-date CoViD19 numbers for first?`
	);
};

const helpHandler = chatId => {
	bot.sendMessage(
		chatId,
		`To get the current CoviD-19 numbers for a specific country, just send me the country's name in english.
To get the worldwide numbers, send 'world'.
If you have questions or feedback, reach out to my creator @louissugar`
	);
};

const settingsHandler = (chatId, telegramUser) => {
	bot.sendMessage(chatId, `work in progress`);
};

const worldResponse = async chatId => {
	let worldData = await data.all();
	const msgText = `<b><u>World Stats</u></b>

😷Total cases reported: <b>${worldData.cases}</b>
😵Total deaths reported: <b>${worldData.deaths}</b>
🎉Total recovered: <b>${worldData.recovered}</b>`;
	bot.sendMessage(chatId, msgText, { parse_mode: 'HTML' });
};

const countryResponse = async (chatId, country) => {
	console.log(
		`now in countryResponse function, passing in country: ${country}`
	);

	await data
		.country(country)
		.then(res => {
			let msgText = `<b><u>${res.country}</u></b>

😷Total cases reported: <b>${res.cases}</b>
🤒New cases today: <b>${res.todayCases}</b>
	
😵Total deaths reported: <b>${res.deaths}</b>
💀New deaths today: <b>${res.todayDeaths}</b>
	
🎉Total recovered: <b>${res.recovered}</b>
😷Currently in critical condition: <b>${res.critical}</b>`;

			bot.sendMessage(chatId, msgText, { parse_mode: 'HTML' });
		})
		.catch(err => console.log(err));
};

// Bot Handler
bot.on('message', async msg => {
	console.log(
		`received message from ${msg.from.first_name} ${msg.from.last_name}: ${msg.text}`
	);
	const chatId = msg.chat.id;
	const text = msg.text.toLowerCase();
	const telegramUser = {};

	switch (text) {
		case '/start':
			startHandler(chatId, msg.from.first_name, msg.from.username);
			break;

		case '/help':
			helpHandler(chatId);
			break;

		case '/settings':
			settingsHandler(chatId, telegramUser);
			break;

		case 'world':
			try {
				worldResponse(chatId);
			} catch (err) {
				console.error(err);
			}
			break;

		default:
			try {
				countryResponse(chatId, text);
			} catch (err) {
				console.error(err);
			}
			break;
	}
});

module.exports = {
	bot: bot
};
