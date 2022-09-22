import { EEventType } from "../enums/event-type.enum";

export interface IConversationStartedMessage {
  event: EEventType;
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
