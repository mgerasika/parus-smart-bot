require("dotenv").config();
export const ENV = {
  VIBER_WEB_HOOK: process.env.VIBER_WEB_HOOK,
  PROXY_WEB_HOOK: process.env.PROXY_WEB_HOOK,
  VIBER_PROXY_TOKEN: process.env.VIBER_PROXY_TOKEN,
};

