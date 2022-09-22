import axios from "axios";
import express from "express";
import { Express } from "express-serve-static-core";
import { initApp } from "./app";
import { getAxiosConfig } from "./common";
const app = express();
const port = process.env.PORT || 3005;

initApp(app);

enum EApis {
  setup = "/setup",
  unSetup = "/unsetup",
  webhook = "/webhook",
  clear = "/clear",
}
app.get("/", (req, res) => {
  res.send("");
});

app.get(EApis.setup, async (req, res) => {
  try {
    const data = await axios.post(
      "https://chatapi.viber.com/pa/set_webhook",
      {
        // url: "http://mger.site/webhook",
        // url: "https://95e2-178-210-131-101.eu.ngrok.io/webhook",
        //setup response {"status":0,"status_message":"ok","chat_hostname":"SN-CHAT-04_","event_types":["subscribed","unsubscribed","conversation_started","delivered","failed","message","seen"]}
        url: "https://parus-smart-bot.herokuapp.com/webhook",
        event_types: [
          "delivered",
          "seen",
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
    res.send("setup response " + JSON.stringify(data.data));
  } catch (error) {
    res.send("error" + JSON.stringify(error));
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
    res.send("unsetup response " + JSON.stringify(data.data));
  } catch (error) {
    res.send("error" + JSON.stringify(error));
  }
});

let dataArray: any[] = [];
app.post(EApis.webhook, (req, res) => {
  console.log("webhook", req.body);
  try {
    axios.post("http://178.210.131.101:3005/", req.body);
  } catch (ex) {}
  try {
    axios.post("http://178.210.131.101:3006/", req.body);
  } catch (ex) {}
  dataArray.push(req.body);
  res.send("received" + req.body);
});

app.get(EApis.webhook, (req, res) => {
  res.send(JSON.stringify(dataArray, null, 2));
});

app.get(EApis.clear, (req, res) => {
  dataArray = [];
  res.send(JSON.stringify(dataArray, null, 2));
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
