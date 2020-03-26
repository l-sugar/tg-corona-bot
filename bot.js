const telegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv').config();
const util = require('util');

const data = require('./data');

const token = process.env.TG_BOT_TOKEN;

const bot = new telegramBot(token, { polling: true });

// Bot Functions

const welcomeMessage = (chatId, firstName) => {
	bot.sendMessage(
		chatId,
		`Welcome ${firstName}!
        
	What country would you like to get up-to-date CoViD19 numbers for first?`
	);
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
	data
		.country(country)
		.then(result => console.log(`countryResponse received result: ${result}`))
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
	if (text == '/start') {
		welcomeMessage(chatId, msg.from.first_name);
		return;
	}

	try {
		let worldArguments = ['world', 'international', 'all', 'everywhere'];
		if (worldArguments.includes(text)) {
			await worldResponse(chatId);
			return;
		}
		console.log(
			`have received message for country function, passing in text: ${text}`
		);
		await countryResponse(chatId, text);
		return;
	} catch (err) {
		console.log(err.error);
	}
});

module.exports = {
	bot: bot
};
