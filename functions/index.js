const functions = require("firebase-functions");

const app = require('./express');

app.get("/webhook2", (req, res) => {
	res.send(`${ Date.now() }`);
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.app = functions.https.onRequest(app);
