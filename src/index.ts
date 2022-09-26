import axios, { AxiosRequestConfig } from "axios";
import express from "express";
const app = express();
import bodyParser from "body-parser";
import { ENV } from "./env.constant";
import "module-alias/register";
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
app.get("/", (req, res) => {
  res.send(Object.values(EApis).join(", "));
});

enum EApis {
  setup = "/setup",
  unSetup = "/unsetup",
  webhook = "/webhook",
}
app.post(EApis.webhook, async (req, res) => {
  const body = req.body;

  console.log("webhook body", body);
  //Warning!!! when setup set to false
  const DEBUG_VERSION = true;
  if (DEBUG_VERSION) {
    try {
      await axios.post(`${ENV.DEBUG_VIBER_SERVER_URL}`, body);
      res.status(200).send();
    } catch (error) {
      console.log("error = ", error);
      res.status(400).send(error);
    }
  } else {
    res.status(200).send();
  }
});

app.get(EApis.setup, async (req, res) => {
  try {
    const data = await axios.post(
      "https://chatapi.viber.com/pa/set_webhook",
      {
        url: `${ENV.VIBER_PROXY_SERVER_URL}webhook`,
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

const PORT = process.env.PORT || 3005;
console.log(app.get("env"));
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

function getAxiosConfig(): AxiosRequestConfig {
  return {
    headers: {
      "X-Viber-Auth-Token": ENV.VIBER_PROXY_TOKEN as any,
    },
  };
}
