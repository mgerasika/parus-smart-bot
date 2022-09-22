'use strict';

const ViberBot = require('viber-bot').Bot;
const winston = require('winston');
const toYAML = require('winston-console-formatter'); // makes the output more friendly

//X-Viber-Auth-Token
function createLogger() {
	const logger = new winston.Logger({
		level: "debug"
	}); // We recommend DEBUG for development
	logger.add(winston.transports.Console, toYAML.config());
	return logger;
}

const logger = createLogger();
const bot = new ViberBot({
	logger: logger,
	authToken: '4fd8dc41e8a7e2bf-37458628c34b9ba8-9fece30a816063ce'
	
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
	// Echo's back the message to the client. Your bot logic should sit here.
	response.send(message);
});

// Wasn't that easy? Let's create HTTPS server and set the webhook:
const https = require('https');
const port = process.env.PORT || 8080;

// Viber will push messages sent to this URL. Web server should be internet-facing.
const webhookUrl = process.env.WEBHOOK_URL;

const httpsOptions = {
	// key: ...,
	// cert: ...,
	// ca: ...
}; // Trusted SSL certification (not self-signed).
https.createServer(httpsOptions, bot.middleware()).listen(port, () => bot.setWebhook(webhookUrl));