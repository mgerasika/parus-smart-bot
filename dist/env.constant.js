"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
require("dotenv").config();
exports.ENV = {
    VIBER_PROXY_SERVER_URL: process.env.VIBER_PROXY_SERVER_URL,
    VIBER_PROXY_TOKEN: process.env.VIBER_PROXY_TOKEN,
    DEBUG_VIBER_SERVER_URL: process.env.DEBUG_VIBER_SERVER_URL,
};
console.log("ENV=", exports.ENV);
// console.log("Buffer = ", Buffer.from(ENV.GOOGLE_API_CRED).toString("base64"));
//# sourceMappingURL=env.constant.js.map