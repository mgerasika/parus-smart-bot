"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ENV = void 0;
const STRAPI_URL = "http://api.parus-smart.site/";
const STRAPI_TOKEN = "1398e1ac3e2281a6801457b4183081c589fcd64f33d6e3cb310d3651b8e58cdfb7fa7b54ca7673438e2e39a919317144623a78ffbaee3645def05820f2df0988681e0d2d8758a826ce96b6ce09693c0d372f0dd51fc005561854aaf121a9ddd1df9573746e06709362504b6bdc1ebf290a94ba2a54e5573fa9be8b5e6bdf9558";
exports.ENV = {
    STRAPI_URL: process.env.STRAPI_URL || STRAPI_URL,
    STRAPI_TOKEN: process.env.STRAPI_TOKEN || STRAPI_TOKEN,
    VIBER_PROXY_SERVER_URL: "https://parus-smart-bot.herokuapp.com/",
    VIBER_PROXY_TOKEN: "4fd8dc41e8a7e2bf-37458628c34b9ba8-9fece30a816063ce",
    DEBUG_VIBER_SERVER_URL: "http://178.210.131.101:3005/",
};
//# sourceMappingURL=env.constant.js.map