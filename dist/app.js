"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = void 0;
// https://partners.viber.com/
// https://developers.viber.com/docs/api/rest-bot-api/#send-message
function initApp(app) {
    app.post("/webhook", (request, response) => {
        console.log("received from viber something", request.body);
        // start insert code
        // if (req.body.sdfsdf === "") {
        //   sendMessageToViber({
        //     receiver: "viber.user.id",
        //     type: "text",
        //     text: "hello world",
        //   });
        // }
    });
}
exports.initApp = initApp;
/*
 документи та звіти
 благодійний внесок
 запитання відповіді
 контакти
 */
//# sourceMappingURL=app.js.map