export interface IOrder {
  name: string;
  email: string;
  tel: string;
  address: string;
  orderID: number;
}

export type TOrderResult = {
  success: boolean;
  status: string;
  msg: string;
};

export const sendOrder = async (order: IOrder): Promise<TOrderResult> => {
  return new Promise((resolve) => {
    const res = {
      success: true,
      status: 'Заявка отправлена',
      msg: `<p>Художник свяжется с вами в ближайшее время для обсужденя деталей покупки и доставки.</p>
      <p>Если по какой то причине вы не получили ответ в течение дня пожалуйста, напишите в WhatsApp.</p>`,
    };

    setTimeout(() => {
      resolve(res);
    }, 2000);
  });
};
