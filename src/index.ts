import axios from "axios";
import express from "express";
import { Express } from "express-serve-static-core";
import { processRequest } from "./app";
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
app.get("/", (req, res) => {
  res.send(Object.values(EApis).join(", "));
});

app.post(EApis.webhook, async (req, res) => {
  const body = req.body;
  if (app.get("env") === "development") {
    try {
      await processRequest(req, res);
      res.status(200).send();
    } catch (error) {
      res.status(400).send(error);
    }
  } else {
    //Warning!!! when setup set to false
    const DEBUG_VERSION = true;
    if (DEBUG_VERSION) {
      try {
        axios.post(
          "http://178.210.131.101:3005/webhook",
          body,
          getAxiosConfig()
        );
        res.status(200).send();
      } catch (error) {
        console.log("error = ", error);
        res.status(400).send(error);
      }
    } else {
      try {
        await processRequest(req, res);
        res.status(200).send();
      } catch (error) {
        res.status(400).send(error);
      }
    }
  }
});

app.get(EApis.setup, async (req, res) => {
  try {
    const data = await axios.post(
      "https://chatapi.viber.com/pa/set_webhook",
      {
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
