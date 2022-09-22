import axios, { AxiosRequestConfig } from "axios";

export enum EApis {
  setup = "/setup",
  unSetup = "/unsetup",
  webhook = "/webhook",
}

export enum EEventTypes {
  delivered = "delivered",
  seen = "seen",
  failed = "failed",
  subscribed = "subscribed",
  unsubscribed = "unsubscribed",
  message = "message",
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

export interface IMessage {
  event: EEventTypes;
  timestamp: number;
  chat_hostname: string;
  message_token: number;
  sender: {
    id: string;
    name: string;
    avatar: string;
    language: string;
    country: string;
    api_version: number;
  };
  message: { text: string; type: string };
  silent: boolean;
}

export interface IConversationStartedMessage {
  event: EEventTypes;
  timestamp: number;
  chat_hostname: string;
  message_token: number;
  type: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    language: string;
    country: string;
    api_version: number;
  };
  subscribed: boolean;
}

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
    console.log("send = ", message);
    const data = await axios.post(
      "https://chatapi.viber.com/pa/send_message",
      message,
      getAxiosConfig()
    );
    return { data };
  } catch (error) {
    console.log("error", error);
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
