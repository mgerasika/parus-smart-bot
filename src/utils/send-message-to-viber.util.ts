import axios, { AxiosRequestConfig } from "axios";
import { ENV } from "../constants/env.constant";
import { EMessageType } from "../enums/message-type.enum";

export async function sendTextMessageToViber(message: {
  receiver: string;
  text: string;
  sender?: {
    name: string;
    avatar: string;
  };
}): Promise<{ data?: any; error?: any }> {
  return await sendMessage({
    ...message,
    min_api_version: 7,
    type: EMessageType.text,
    keyboard: {
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
    },
  });
}

export async function sendPictureMessageToViber(message: {
  receiver: string;
  text: string;
  media: string;
  thumbnail?: string;
}): Promise<{ data?: any; error?: any }> {
  return await sendMessage({
    ...message,
    type: EMessageType.picture,
    sender: {
      name: "John McClane",
      avatar: "http://avatar.example.com",
    },
  });
}

export async function sendMessage(
  message: any
): Promise<{ data?: any; error?: any }> {
  try {
    const data = await axios.post(
      "https://chatapi.viber.com/pa/send_message",
      message,
      getAxiosConfig()
    );
    return { data };
  } catch (error) {
    console.log("error ", JSON.stringify(error));
    return { error };
  }
}

export function getAxiosConfig(): AxiosRequestConfig {
  return {
    headers: {
      "X-Viber-Auth-Token": ENV.VIBER_PROXY_TOKEN,
    },
  };
}
