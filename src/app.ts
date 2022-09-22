import { sendMessageToViber } from "./common";

// https://partners.viber.com/
// https://developers.viber.com/docs/api/rest-bot-api/#send-message
export function initApp(app: any) {
  app.post("/webhook", (request: any, response: any) => {
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

/*
 документи та звіти
 благодійний внесок
 запитання відповіді
 контакти
 */
