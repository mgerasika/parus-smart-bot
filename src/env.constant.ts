require("dotenv").config();
export const ENV = {
  VIBER_PROXY_SERVER_URL: "https://parus-smart-bot.herokuapp.com/",
  DEBUG_VIBER_SERVER_URL: "http://178.210.131.101:1337/api/viber/web_hook",
  VIBER_PROXY_TOKEN: process.env.VIBER_PROXY_TOKEN,
};

