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
exports.getAxiosConfig = exports.sendMessage = exports.sendPictureMessageToViber = exports.sendTextMessageToViber = exports.EMessageType = exports.EEventTypes = exports.EApis = void 0;
const axios_1 = __importDefault(require("axios"));
var EApis;
(function (EApis) {
    EApis["setup"] = "/setup";
    EApis["unSetup"] = "/unsetup";
    EApis["webhook"] = "/webhook";
})(EApis = exports.EApis || (exports.EApis = {}));
var EEventTypes;
(function (EEventTypes) {
    EEventTypes["delivered"] = "delivered";
    EEventTypes["seen"] = "seen";
    EEventTypes["failed"] = "failed";
    EEventTypes["subscribed"] = "subscribed";
    EEventTypes["unsubscribed"] = "unsubscribed";
    EEventTypes["message"] = "message";
    EEventTypes["conversation_started"] = "conversation_started";
})(EEventTypes = exports.EEventTypes || (exports.EEventTypes = {}));
var EMessageType;
(function (EMessageType) {
    EMessageType["text"] = "text";
    EMessageType["picture"] = "picture";
    EMessageType["video"] = "video";
    EMessageType["file"] = "file";
    EMessageType["location"] = "location";
    EMessageType["contact"] = "contact";
    EMessageType["sticker"] = "sticker";
    EMessageType["carousel"] = "carousel";
    EMessageType["content"] = "content";
    EMessageType["url"] = "url";
})(EMessageType = exports.EMessageType || (exports.EMessageType = {}));
function sendTextMessageToViber(message) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield sendMessage(Object.assign(Object.assign({}, message), { min_api_version: 7, type: EMessageType.text, keyboard: {
                Type: "keyboard",
                DefaultHeight: false,
                Buttons: [
                    {
                        ActionType: "reply",
                        ActionBody: "reply to me 1",
                        Text: "Так давай",
                        TextSize: "regular",
                    },
                    {
                        ActionType: "reply",
                        ActionBody: "reply to me 2",
                        Text: "Ні я тебе більше не хочу Піди купи капусту краще",
                        TextSize: "regular",
                    },
                ],
            } }));
    });
}
exports.sendTextMessageToViber = sendTextMessageToViber;
function sendPictureMessageToViber(message) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield sendMessage(Object.assign(Object.assign({}, message), { type: EMessageType.picture, sender: {
                name: "John McClane",
                avatar: "http://avatar.example.com",
            } }));
    });
}
exports.sendPictureMessageToViber = sendPictureMessageToViber;
function sendMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("send = ", message);
            const data = yield axios_1.default.post("https://chatapi.viber.com/pa/send_message", message, getAxiosConfig());
            return { data };
        }
        catch (error) {
            console.log("error", error);
            return { error };
        }
    });
}
exports.sendMessage = sendMessage;
function getAxiosConfig() {
    return {
        headers: {
            "X-Viber-Auth-Token": "4fd8dc41e8a7e2bf-37458628c34b9ba8-9fece30a816063ce",
        },
    };
}
exports.getAxiosConfig = getAxiosConfig;
//# sourceMappingURL=common.js.map