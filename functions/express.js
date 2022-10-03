const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
require("module-alias/register");
require("dotenv").config();

const EApis = {
	setup: "/setup",
	unSetup: "/unsetup",
	webhook: "/webhook",
};
const ENV = {
	VIBER_WEB_HOOK: process.env.VIBER_WEB_HOOK,
	PROXY_WEB_HOOK: process.env.PROXY_WEB_HOOK,
	VIBER_PROXY_TOKEN: process.env.VIBER_PROXY_TOKEN,
};
const app = express();
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(
	bodyParser.urlencoded({
		// to support URL-encoded bodies
		extended: true,
	})
);
app.use(express.json());
app.use(express.urlencoded());
// app.use(express.multipart());
app.get(EApis.webhook, (req, res) => {
	res.send(Object.values(EApis).join(", ") + " viberHook = " + ENV.VIBER_WEB_HOOK);
});


app.post(EApis.webhook, async (req, res) => {
	const body = req.body;

	console.log("webhook-body", body);
	//Warning!!! when setup set to false
	const DEBUG_VERSION = true;
	if (DEBUG_VERSION) {
		try {
			axios
				.post(`${ ENV.PROXY_WEB_HOOK }`, body)
				.then(() => {
					console.log("webhook-result success");
					//   res.status(200).send();
				})
				.catch((error) => {
					console.log("webhook-result error", error);
					//   res.status(200).send();
				});

			//todo example
			res.status(200).send();
		} catch (error) {
			console.log("error = ", error);
			res.status(400).send(error);
		}
	} else {
		res.status(200).send();
	}
});

app.get(EApis.setup, async (req, res) => {
	try {
		const data = await axios.post(
			"https://chatapi.viber.com/pa/set_webhook",
			{
				url: `${ ENV.VIBER_WEB_HOOK }`,
				event_types: [
					//   "delivered",
					//   "seen",
					"failed",
					"subscribed",
					"unsubscribed",
					"message",
					"conversation_started",
				],
				send_name: true,
				send_photo: true,
			},
			getAxiosConfig()
		);
		console.log(data.data);
		res.status(200).send(data.data);
	} catch (error) {
		console.log("error = ", error);
		res.status(400).send(error);
	}
});

app.get(EApis.unSetup, async (req, res) => {
	try {
		const data = await axios.post(
			"https://chatapi.viber.com/pa/set_webhook",
			{
				url: "",
			},
			getAxiosConfig()
		);
		console.log(data.data);
		res.status(200).send(data.data);
	} catch (error) {
		console.log("error = ", error);
		res.status(400).send(error);
	}
});
module.exports = app;
// const PORT = process.env.PORT || 3005;
// console.log(app.get("env"));
// app.listen(PORT, () => {
//   console.log(`Example app listening on port ${PORT}`);
// });

function getAxiosConfig() {
	return {
		headers: {
			"X-Viber-Auth-Token": ENV.VIBER_PROXY_TOKEN,
		},
	};
}
