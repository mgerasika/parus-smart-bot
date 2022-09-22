import axios from "axios";
import express from "express";
import { setOriginalNode } from "typescript";
const app = express();
const port = process.env.PORT || 3005;

// https://partners.viber.com/
app.get("/", (req, res) => {
  res.send("Hello World22!");
});

app.get("/setup", async (req, res) => {
  try {
    const data = await axios.post(
      "https://chatapi.viber.com/pa/set_webhook",
      {
        // url: "http://mger.site/webhook",
        url: "https://95e2-178-210-131-101.eu.ngrok.io/webhook",
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
      {
        headers: {
          "X-Viber-Auth-Token":
            "4fd8dc41e8a7e2bf-37458628c34b9ba8-9fece30a816063ce",
        },
      }
    );
    console.log(data.data);
    res.send("setup response " + JSON.stringify(data.data));
  } catch (error) {
    res.send("error" + JSON.stringify(error));
  }
});

app.get("/unsetup", async (req, res) => {
  try {
    const data = await axios.post(
      "https://chatapi.viber.com/pa/set_webhook",
      {
        url: "",
      },
      {
        headers: {
          "X-Viber-Auth-Token":
            "4fd8dc41e8a7e2bf-37458628c34b9ba8-9fece30a816063ce",
        },
      }
    );
    console.log(data.data);
    res.send("unsetup response " + JSON.stringify(data.data));
  } catch (error) {
    res.send("error" + JSON.stringify(error));
  }
});

app.post("/webhook", (req, res) => {
  console.log("webhook", req.body);
  res.send("recieved" + req.body);
});

app.get("/webhook", (req, res) => {
  res.send("webhook get");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// if(vier.event === 'conversation_started')
const data = {
  receiver: "viber.user.id",
  type: "text",
  text: "hello world",
};
async function send(message: string): Promise<{ data?: any; error?: any }> {
  try {
    const data = await axios.post(
      "https://chatapi.viber.com/pa/send_message",
      {
        url: "",
      },
      {
        headers: {
          "X-Viber-Auth-Token":
            "4fd8dc41e8a7e2bf-37458628c34b9ba8-9fece30a816063ce",
        },
      }
    );
    return { data };
  } catch (error) {
    return { error };
  }
}
