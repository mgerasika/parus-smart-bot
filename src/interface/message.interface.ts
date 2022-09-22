import { EEventType } from "../enums/event-type.enum";

export interface IMessage {
  event: EEventType;
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
