import axios, { AxiosRequestConfig } from "axios";

// if(vier.event === 'conversation_started')
const exampleData = {
  receiver: "viber.user.id",
  type: "text",
  text: "hello world",
};
export async function sendMessageToViber(
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
