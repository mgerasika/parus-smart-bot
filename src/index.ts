import axios, { AxiosRequestConfig } from "axios";
import express from "express";
const fs = require('fs');
var http = require('http');
var https = require('https');
const app = express();
import bodyParser from "body-parser";
import { ENV } from "./env.constant";
import "module-alias/register";

// var privateKey  = fs.readFileSync('cert/privkey.pem', 'utf8');
// var certificate = fs.readFileSync('cert/fullchain.pem', 'utf8');

var privateKey  = fs.readFileSync('cert/localhost.key', 'utf8');
var certificate = fs.readFileSync('cert/localhost.crt', 'utf8');

var credentials = { key: privateKey, cert: certificate };

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
app.get("/webhook", (req, res) => {
  res.send(
    Object.values(EApis).join(", ") + " viberHook = " + ENV.VIBER_WEB_HOOK
  );
});

enum EApis {
  setup = "/setup",
  unSetup = "/unsetup",
  webhook = "/webhook",
}
app.post(EApis.webhook, async (req, res) => {
  const body = req.body;

  console.log("webhook-body", body);
  //Warning!!! when setup set to false
  const DEBUG_VERSION = true;
  if (DEBUG_VERSION) {
    try {
      axios
        .post(`${ENV.PROXY_WEB_HOOK}`, body)
        .then(() => {
          console.log("webhook-result success");
          //   res.status(200).send();
        })
        .catch((error) => {
          console.log("webhook-result error", error);
          //   res.status(200).send();
        });

      //todo example
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
        url: `${ENV.VIBER_WEB_HOOK}`,
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
const PORTS = process.env.PORTS || 3006;
console.log(app.get("env"));


var httpServer = http.createServer(app);
var httpsServer = https.createServer(credentials, app);

httpServer.listen(PORT, () => {
  console.log(`Example htpp app listening on port ${PORT}`);
});

httpsServer.listen(PORTS, () => {
	console.log(`Example https app listening on port ${PORTS}`);
  });

function getAxiosConfig(): AxiosRequestConfig {
  return {
    headers: {
      "X-Viber-Auth-Token": ENV.VIBER_PROXY_TOKEN as any,
    },
  };
}
