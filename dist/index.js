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
const body_parser_1 = __importDefault(require("body-parser"));
const env_constant_1 = require("./env.constant");
require("module-alias/register");
app.use(body_parser_1.default.json()); // to support JSON-encoded bodies
app.use(body_parser_1.default.urlencoded({
    // to support URL-encoded bodies
    extended: true,
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
// app.use(express.multipart());
app.get("/", (req, res) => {
    res.send(Object.values(EApis).join(", "));
});
var EApis;
(function (EApis) {
    EApis["setup"] = "/setup";
    EApis["unSetup"] = "/unsetup";
    EApis["webhook"] = "/webhook";
})(EApis || (EApis = {}));
app.post(EApis.webhook, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    //Warning!!! when setup set to false
    const DEBUG_VERSION = true;
    if (DEBUG_VERSION) {
        try {
            axios_1.default.post(`${env_constant_1.ENV.DEBUG_VIBER_SERVER_URL}`, body, getAxiosConfig());
            res.status(200).send();
        }
        catch (error) {
            console.log("error = ", error);
            res.status(400).send(error);
        }
    }
    else {
        res.status(200).send();
    }
}));
app.get(EApis.setup, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield axios_1.default.post("https://chatapi.viber.com/pa/set_webhook", {
            url: `${env_constant_1.ENV.VIBER_PROXY_SERVER_URL}webhook`,
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
        }, getAxiosConfig());
        console.log(data.data);
        res.status(200).send(data.data);
    }
    catch (error) {
        console.log("error = ", error);
        res.status(400).send(error);
    }
}));
app.get(EApis.unSetup, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield axios_1.default.post("https://chatapi.viber.com/pa/set_webhook", {
            url: "",
        }, getAxiosConfig());
        console.log(data.data);
        res.status(200).send(data.data);
    }
    catch (error) {
        console.log("error = ", error);
        res.status(400).send(error);
    }
}));
const PORT = process.env.PORT || 3005;
console.log(app.get("env"));
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
function getAxiosConfig() {
    return {
        headers: {
            "X-Viber-Auth-Token": env_constant_1.ENV.VIBER_PROXY_TOKEN,
        },
    };
}
//# sourceMappingURL=index.js.map