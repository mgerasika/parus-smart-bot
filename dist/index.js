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
const app_1 = require("./app");
const common_1 = require("./common");
const app = (0, express_1.default)();
const port = process.env.PORT || 3005;
(0, app_1.initApp)(app);
var EApis;
(function (EApis) {
    EApis["setup"] = "/setup";
    EApis["unSetup"] = "/unsetup";
    EApis["webhook"] = "/webhook";
    EApis["clear"] = "/clear";
})(EApis || (EApis = {}));
app.get("/", (req, res) => {
    res.send(Object.values(EApis).join(', '));
});
app.get(EApis.setup, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        }, (0, common_1.getAxiosConfig)());
        console.log(data.data);
        res.send("setup response " + JSON.stringify(data.data));
    }
    catch (error) {
        res.send("error" + JSON.stringify(error));
    }
}));
app.get(EApis.unSetup, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield axios_1.default.post("https://chatapi.viber.com/pa/set_webhook", {
            url: "",
        }, (0, common_1.getAxiosConfig)());
        console.log(data.data);
        res.send("unsetup response " + JSON.stringify(data.data));
    }
    catch (error) {
        res.send("error" + JSON.stringify(error));
    }
}));
let dataArray = [];
app.post(EApis.webhook, (req, res) => {
    console.log("webhook", req.body);
    try {
        axios_1.default.post("http://178.210.131.101:3005/", req.body);
    }
    catch (ex) { }
    try {
        axios_1.default.post("http://178.210.131.101:3006/", req.body);
    }
    catch (ex) { }
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
//# sourceMappingURL=index.js.map