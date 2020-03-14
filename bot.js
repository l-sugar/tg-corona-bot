const telegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv').config();
const util = require('util');

const data = require('./data');

const token = process.env.TG_BOT_TOKEN;

const bot = new telegramBot(token, { polling: true });

bot.on('message', async msg => {
	const chatId = msg.chat.id;
	const text = msg.text;
	if (text == '/start') {
		bot.sendMessage(
			msg.chat.id,
			`Welcome ${msg.from.first_name}!
        
What country would you like to get up-to-date CoViD19 numbers for first?`
		);
	}

	try {
		let countryData = await data.country(text);
		let msgText;
		countryData
			? (msgText = `<b><u>${countryData.country}</u></b>

😷Total cases reported: <b>${countryData.cases}</b>
🤒New cases today: <b>${countryData.todayCases}</b>

😵Total deaths reported: <b>${countryData.deaths}</b>
💀New deaths today: <b>${countryData.todayDeaths}</b>

🎉Total recovered: <b>${countryData.recovered}</b>
😷Currently in critical condition: <b>${countryData.critical}</b>`)
			: msg.text.indexOf('/') == 0
			? false
			: (msgText = 'Invalid Input, please try again');

		bot.sendMessage(chatId, msgText, { parse_mode: 'HTML' });
	} catch (err) {
		console.error(err);
	}
});

module.exports = {
	bot: bot
};
