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
exports.getAxiosConfig = exports.sendMessage = exports.sendPictureMessageToViber = exports.sendTextMessageToViber = exports.EApis = void 0;
const axios_1 = __importDefault(require("axios"));
const message_type_enum_1 = require("./enums/message-type.enum");
var EApis;
(function (EApis) {
    EApis["setup"] = "/setup";
    EApis["unSetup"] = "/unsetup";
    EApis["webhook"] = "/webhook";
})(EApis = exports.EApis || (exports.EApis = {}));
function sendTextMessageToViber(message) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield sendMessage(Object.assign(Object.assign({}, message), { min_api_version: 7, type: message_type_enum_1.EMessageType.text, keyboard: {
                Type: "keyboard",
                DefaultHeight: false,
                Buttons: [
                    {
                        ActionType: "reply",
                        ActionBody: "reply1",
                        Text: "Так давай",
                        TextSize: "regular",
                    },
                    {
                        ActionType: "reply",
                        ActionBody: "reply2",
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
        return yield sendMessage(Object.assign(Object.assign({}, message), { type: message_type_enum_1.EMessageType.picture, sender: {
                name: "John McClane",
                avatar: "http://avatar.example.com",
            } }));
    });
}
exports.sendPictureMessageToViber = sendPictureMessageToViber;
function sendMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield axios_1.default.post("https://chatapi.viber.com/pa/send_message", message, getAxiosConfig());
            return { data };
        }
        catch (error) {
            console.log("error ", JSON.stringify(error));
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