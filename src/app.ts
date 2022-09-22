import { EApis, sendTextMessageToViber as sendTextMessageToViber } from "./common";

// heroku logs -t --app parus-smart-bot
// https://parus-smart-bot.herokuapp.com/
// https://partners.viber.com/
// https://developers.viber.com/docs/api/rest-bot-api/#send-message
export function initApp(app: any) {
  app.post(EApis.webhook, (request: any, response: any) => {
    console.log("received from viber something", request.body);

    if (request.body.event === "delivered") {
      // do nothing
    }
    if (request.body.event === "conversation_started") {
      sendTextMessageToViber({
        receiver: request.body.user.id,
        text: "Привіт Юля. Я твій віртуальний коханець. Давай дружити",
      });
    }
  });
}

/*
 документи та звіти
 благодійний внесок
 запитання відповіді
 контакти
 */
