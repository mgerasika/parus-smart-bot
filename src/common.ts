import axios, { AxiosRequestConfig } from "axios";

export enum EApis {
  setup = "/setup",
  unSetup = "/unsetup",
  webhook = "/webhook",
  clear = "/clear",
}

export enum EEventTypes {
  delivered = "delivered",
  seen = "seen",
  failed = "failed",
  subscribed = "subscribed",
  unsubscribed = "unsubscribed",
  conversation_started = "conversation_started",
}

export enum EMessageType {
  text = "text",
  picture = "picture",
  video = "video",
  file = "file",
  location = "location",
  contact = "contact",
  sticker = "sticker",
  carousel = "carousel",
  content = "content",
  url = "url",
}

export async function sendTextMessageToViber(message: {
  receiver: string;
  text: string;
}): Promise<{ data?: any; error?: any }> {
  try {
    const data = await axios.post(
      "https://chatapi.viber.com/pa/send_message",

      {
        ...message,
        min_api_version: 7,
        type: EMessageType.text,
       
		
		  keyboard: {
          Type: "keyboard",
          DefaultHeight: false,
          Buttons: [
            {
              ActionType: "reply",
              ActionBody: "reply to me",
              Text: "Так давай",
              TextSize: "regular",
            },
            {
              ActionType: "reply",
              ActionBody: "reply to me",
              Text: "Ні я тебе більше не хочу Піди купи капусту краще",
              TextSize: "regular",
            },
          ],
		  },
		  

      },
      getAxiosConfig()
    );
    return { data };
  } catch (error) {
    return { error };
  }
}

export async function sendPictureMessageToViber(message: {
  receiver: string;
  text: string;
  media: string;
  thumbnail?: string;
}): Promise<{ data?: any; error?: any }> {
  try {
    const data = await axios.post(
      "https://chatapi.viber.com/pa/send_message",
      {
        ...message,
        type: EMessageType.picture,
      },
      getAxiosConfig()
    );
    return { data };
  } catch (error) {
    return { error };
  }
}

export function getAxiosConfig(): AxiosRequestConfig {
  return {
    headers: {
      "X-Viber-Auth-Token":
        "4fd8dc41e8a7e2bf-37458628c34b9ba8-9fece30a816063ce",
    },
  };
}
