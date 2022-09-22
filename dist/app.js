"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = void 0;
const common_1 = require("./common");
// heroku logs -t --app parus-smart-bot
// https://parus-smart-bot.herokuapp.com/
// https://partners.viber.com/
// https://developers.viber.com/docs/api/rest-bot-api/#send-message
function initApp(app) {
    app.post(common_1.EApis.webhook, (request, response) => {
        console.log("received from viber something", request.body);
        if (request.body.event === "delivered") {
            // do nothing
        }
        if (request.body.event === "conversation_started") {
            (0, common_1.sendTextMessageToViber)({
                receiver: request.body.user.id,
                text: "Привіт Юля. Я твій віртуальний коханець. Давай дружити",
            });
        }
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