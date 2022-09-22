"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initApp = void 0;
const common_1 = require("./common");
// heroku logs -t --app parus-smart-bot
// https://parus-smart-bot.herokuapp.com/
// https://partners.viber.com/
// https://developers.viber.com/docs/api/rest-bot-api/#send-message
function initApp(app) {
    app.post(common_1.EApis.webhook, (request, response) => __awaiter(this, void 0, void 0, function* () {
        console.log("received from viber = ", request.body);
        if (request.body.event === common_1.EEventTypes.delivered) {
            // do nothing
        }
        if (request.body.event === common_1.EEventTypes.message) {
            const body = request.body;
            if (body.sender.id !== '') {
            }
            yield (0, common_1.sendMessage)({
                receiver: body.sender.id,
                type: "rich_media",
                min_api_version: 7,
                rich_media: {
                    Type: "rich_media",
                    ButtonsGroupColumns: 6,
                    ButtonsGroupRows: 7,
                    BgColor: "#FFFFFF",
                    Buttons: [
                        {
                            Columns: 6,
                            Rows: 3,
                            ActionType: "open-url",
                            ActionBody: "https://www.google.com",
                            Image: "http://html-test:8080/myweb/guy/assets/imageRMsmall2.png",
                        },
                        {
                            Columns: 6,
                            Rows: 2,
                            Text: "<font color=#323232><b>Headphones with Microphone, On-ear Wired earphones</b></font><font color=#777777><br>Sound Intone </font><font color=#6fc133>$17.99</font>",
                            ActionType: "open-url",
                            ActionBody: "https://www.google.com",
                            TextSize: "medium",
                            TextVAlign: "middle",
                            TextHAlign: "left",
                        },
                        {
                            Columns: 6,
                            Rows: 1,
                            ActionType: "reply",
                            ActionBody: "https://www.google.com",
                            Text: "<font color=#ffffff>Buy</font>",
                            TextSize: "large",
                            TextVAlign: "middle",
                            TextHAlign: "middle",
                            Image: "https://s14.postimg.org/4mmt4rw1t/Button.png",
                        },
                        {
                            Columns: 6,
                            Rows: 1,
                            ActionType: "reply",
                            ActionBody: "https://www.google.com",
                            Text: "<font color=#8367db>MORE DETAILS</font>",
                            TextSize: "small",
                            TextVAlign: "middle",
                            TextHAlign: "middle",
                        },
                        {
                            Columns: 6,
                            Rows: 3,
                            ActionType: "open-url",
                            ActionBody: "https://www.google.com",
                            Image: "https://s16.postimg.org/wi8jx20wl/image_RMsmall2.png",
                        },
                        {
                            Columns: 6,
                            Rows: 2,
                            Text: "<font color=#323232><b>Hanes Men's Humor Graphic T-Shirt</b></font><font color=#777777><br>Hanes</font><font color=#6fc133>$10.99</font>",
                            ActionType: "open-url",
                            ActionBody: "https://www.google.com",
                            TextSize: "medium",
                            TextVAlign: "middle",
                            TextHAlign: "left",
                        },
                        {
                            Columns: 6,
                            Rows: 1,
                            ActionType: "reply",
                            ActionBody: "https://www.google.com",
                            Text: "<font color=#ffffff>Buy</font>",
                            TextSize: "large",
                            TextVAlign: "middle",
                            TextHAlign: "middle",
                            Image: "https://s14.postimg.org/4mmt4rw1t/Button.png",
                        },
                        {
                            Columns: 6,
                            Rows: 1,
                            ActionType: "reply",
                            ActionBody: "https://www.google.com",
                            Text: "<font color=#8367db>MORE DETAILS</font>",
                            TextSize: "small",
                            TextVAlign: "middle",
                            TextHAlign: "middle",
                        },
                        {
                            Columns: 6,
                            Rows: 3,
                            ActionType: "open-url",
                            ActionBody: "https://www.google.com",
                            Image: "https://s16.postimg.org/wi8jx20wl/image_RMsmall2.png",
                        },
                        {
                            Columns: 6,
                            Rows: 2,
                            Text: "<font color=#323232><b>Hanes Men's Humor Graphic T-Shirt</b></font><font color=#777777><br>Hanes</font><font color=#6fc133>$10.99</font>",
                            ActionType: "open-url",
                            ActionBody: "https://www.google.com",
                            TextSize: "medium",
                            TextVAlign: "middle",
                            TextHAlign: "left",
                        },
                        {
                            Columns: 6,
                            Rows: 1,
                            ActionType: "reply",
                            ActionBody: "https://www.google.com",
                            Text: "<font color=#ffffff>Buy</font>",
                            TextSize: "large",
                            TextVAlign: "middle",
                            TextHAlign: "middle",
                            Image: "https://s14.postimg.org/4mmt4rw1t/Button.png",
                        },
                        {
                            Columns: 6,
                            Rows: 1,
                            ActionType: "reply",
                            ActionBody: "https://www.google.com",
                            Text: "<font color=#8367db>MORE DETAILS</font>",
                            TextSize: "small",
                            TextVAlign: "middle",
                            TextHAlign: "middle",
                        },
                    ],
                },
            });
        }
        if (request.body.event === common_1.EEventTypes.conversation_started) {
            const body = request.body;
            (0, common_1.sendTextMessageToViber)({
                receiver: body.user.id,
                text: "Привіт Юля. Я твій віртуальний коханець. Давай дружити 222",
                sender: {
                    name: body.user.name,
                    avatar: body.user.avatar,
                },
            });
        }
        response.send("ok");
    }));
}
exports.initApp = initApp;
/*
 документи та звіти
 благодійний внесок
 запитання відповіді
 контакти
 */
//# sourceMappingURL=app.js.map