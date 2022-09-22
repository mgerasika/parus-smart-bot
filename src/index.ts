import axios from "axios";
import express from "express";
import { Express } from "express-serve-static-core";
import { initApp } from "./app";
import { EApis, getAxiosConfig } from "./common";
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
console.log(app.get("env"));
// app.use(express.multipart());
if (app.get("env") === "development") {
  initApp(app);
} else {
  app.post(EApis.webhook, (req, res) => {
    const body = req.body;
    // when setup set to false
    const SEND_TO_PROXY = false;
    if (SEND_TO_PROXY) {
      try {
        axios.post(
          "http://178.210.131.101:3006/webhook",
          body,
          getAxiosConfig()
        );
        res.status(200).send();
      } catch (error) {
        console.log("error = ", error);
        res.status(400).send(error);
      }
    } else {
      res.status(200).send();
    }
  });
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
