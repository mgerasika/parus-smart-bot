import axios from "axios";
import express from "express";
import { Express } from "express-serve-static-core";
import { initApp } from "./app";
import { getAxiosConfig } from "./common";
const app = express();
const port = process.env.PORT || 3005;

import bodyParser from "body-parser";
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
if (process.env.NODE_ENV === "development") {
  initApp(app);
}

enum EApis {
  setup = "/setup",
  unSetup = "/unsetup",
  webhook = "/webhook",
  clear = "/clear",
}
app.get("/", (req, res) => {
  res.send(Object.values(EApis).join(", "));
});

// setup response :["subscribed","unsubscribed","conversation_started","delivered","failed","message","seen"]}
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
  const body = req.body;
  console.log("webhook", body);

  const sendProxyRequests = false;
  if (sendProxyRequests) {
    try {
      axios.post("http://178.210.131.101:3005/", body);
    } catch (ex) {}
    try {
      axios.post("http://178.210.131.101:3006/", body);
    } catch (ex) {}
  }
  dataArray.push(body);
  res.send("received ");
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
