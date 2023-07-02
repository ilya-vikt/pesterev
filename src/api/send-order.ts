export interface IOrder {
  id: number;
  name: string;
  email: string;
  tel: string;
  address: string;
  _wpnonce: string;
}

type TPurchaseConfig = {
  url: string;
  success: string;
  unsuccess: string;
};

declare global {
  interface Window {
    purchaseConfig: TPurchaseConfig;
  }
}

export type TOrderResult = {
  success: boolean;
  msg: string;
};

export const sendOrder = async (order: IOrder): Promise<TOrderResult> => {
  let result;
  try {
    const response = await fetch(window.purchaseConfig.url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(order),
    });
    result = response.ok;
  } catch {
    result = false;
  }
  return result
    ? { success: true, msg: window.purchaseConfig.success }
    : { success: false, msg: window.purchaseConfig.unsuccess };
};
