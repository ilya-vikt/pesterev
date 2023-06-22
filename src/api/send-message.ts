export interface IMsg {
  name: string;
  email: string;
  message: string;
}

export type TMsgResult = {
  success: boolean;
  msg: string;
};

export const sendMessage = async (order: IMsg): Promise<TMsgResult> => {
  return new Promise((resolve) => {
    const res = {
      success: true,
      msg: `<p>Сообщение отправлено</p>
      <p>Если по какой то причине вы не получили ответ в течение дня, пожалуйста, напишите в WhatsApp.</p>`,
    };

    setTimeout(() => {
      resolve(res);
    }, 2000);
  });
};
