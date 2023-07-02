type TCommunicatorConfig = {
  url: string;
  success: string;
  unsuccess: string;
};

declare global {
  interface Window {
    communicatorConfig: TCommunicatorConfig;
  }
}

export interface IMsg {
  name: string;
  email: string;
  message: string;
  city: string;
  _wpnonce: string;
}

export type TMsgResult = {
  success: boolean;
  msg: string;
};

export const sendMessage = async (message: IMsg): Promise<TMsgResult> => {
  let result;
  try {
    const response = await fetch(window.communicatorConfig.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(message),
    });
    result = response.ok;
  } catch {
    result = false;
  }
  return result
    ? { success: true, msg: window.communicatorConfig.success }
    : { success: false, msg: window.communicatorConfig.unsuccess };
};
