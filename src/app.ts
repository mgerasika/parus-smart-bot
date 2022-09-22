import {
  EApis,
  EEventTypes,
  EMessageType,
  IConversationStartedMessage,
  IMessage,
  sendMessage,
  sendTextMessageToViber as sendTextMessageToViber,
} from "./common";

// heroku logs -t --app parus-smart-bot
// https://parus-smart-bot.herokuapp.com/
// https://partners.viber.com/
// https://developers.viber.com/docs/api/rest-bot-api/#send-message
export function initApp(app: any) {
  app.post(EApis.webhook, async (request: any, response: any) => {
    console.log("received from viber = ", request.body);

    if (request.body.event === EEventTypes.delivered) {
      // do nothing
    }
    if (request.body.event === EEventTypes.message) {
      const body = request.body as IMessage;
      await sendMessage({
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
          ],
        },
      });
    }
    if (request.body.event === EEventTypes.conversation_started) {
      const body = request.body as IConversationStartedMessage;
      sendTextMessageToViber({
		  receiver: body.user.id,
        text: "Привіт Юля. Я твій віртуальний коханець. Давай дружити 222",
        sender: {
          name: body.user.name,
          avatar: body.user.avatar,
        },
      });
    }

    response.send("ok");
  });
}

/*
 документи та звіти
 благодійний внесок
 запитання відповіді
 контакти
 */
