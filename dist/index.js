"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const port = process.env.PORT || 3005;
// https://partners.viber.com/
app.get("/", (req, res) => {
    res.send("Hello World22!");
});
app.get("/setup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield axios_1.default.post("https://chatapi.viber.com/pa/set_webhook", {
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
        }, {
            headers: {
                "X-Viber-Auth-Token": "4fd8dc41e8a7e2bf-37458628c34b9ba8-9fece30a816063ce",
            },
        });
        console.log(data.data);
        res.send("setup response " + JSON.stringify(data.data));
    }
    catch (error) {
        res.send("error" + JSON.stringify(error));
    }
}));
app.get("/unsetup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield axios_1.default.post("https://chatapi.viber.com/pa/set_webhook", {
            url: "",
        }, {
            headers: {
                "X-Viber-Auth-Token": "4fd8dc41e8a7e2bf-37458628c34b9ba8-9fece30a816063ce",
            },
        });
        console.log(data.data);
        res.send("unsetup response " + JSON.stringify(data.data));
    }
    catch (error) {
        res.send("error" + JSON.stringify(error));
    }
}));
let dataArray = [];
app.post("/webhook", (req, res) => {
    console.log("webhook", req.body);
    dataArray.push(req.body);
    res.send("recieved" + req.body);
});
app.get("/webhook", (req, res) => {
    res.send(JSON.stringify(dataArray, null, 2));
});
app.get("/clear", (req, res) => {
    dataArray = [];
    res.send(JSON.stringify(dataArray, null, 2));
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
function send(message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield axios_1.default.post("https://chatapi.viber.com/pa/send_message", {
                url: "",
            }, {
                headers: {
                    "X-Viber-Auth-Token": "4fd8dc41e8a7e2bf-37458628c34b9ba8-9fece30a816063ce",
                },
            });
            return { data };
        }
        catch (error) {
            return { error };
        }
    });
}
//# sourceMappingURL=index.js.map