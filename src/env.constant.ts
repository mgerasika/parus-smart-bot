require("dotenv").config();
export const ENV = {
  VIBER_PROXY_SERVER_URL: process.env.VIBER_PROXY_SERVER_URL,
  VIBER_PROXY_TOKEN: process.env.VIBER_PROXY_TOKEN,
  DEBUG_VIBER_SERVER_URL: process.env.DEBUG_VIBER_SERVER_URL,
};
console.log("ENV=", ENV);
// console.log("Buffer = ", Buffer.from(ENV.GOOGLE_API_CRED).toString("base64"));
