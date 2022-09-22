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
exports.getAxiosConfig = exports.sendMessageToViber = void 0;
const axios_1 = __importDefault(require("axios"));
// if(vier.event === 'conversation_started')
const exampleData = {
    receiver: "viber.user.id",
    type: "text",
    text: "hello world",
};
function sendMessageToViber(message) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const data = yield axios_1.default.post("https://chatapi.viber.com/pa/send_message", message, getAxiosConfig());
            return { data };
        }
        catch (error) {
            return { error };
        }
    });
}
exports.sendMessageToViber = sendMessageToViber;
function getAxiosConfig() {
    return {
        headers: {
            "X-Viber-Auth-Token": "4fd8dc41e8a7e2bf-37458628c34b9ba8-9fece30a816063ce",
        },
    };
}
exports.getAxiosConfig = getAxiosConfig;
//# sourceMappingURL=common.js.map