import { setTitle } from '@/components/share/aside-panel/aside-panel';
import type { IOrder } from '@/api/send-order';
import { sendOrder } from '@/api/send-order';
import { initForm } from '@/ts/form-init';

const purchase = document.getElementById('purchase') as HTMLDivElement;
const purchaseResultTxt = document.getElementById('purchase-msg');
const form = document.getElementById('purchase-form') as HTMLFormElement;

const stages = {
  filling: 'purchase--filling',
  sending: 'purchase--sending',
  sended: 'purchase--sended',
  unsuccess: 'purchase--unsuccess',
} as const;

const setStage = (stage: keyof typeof stages): void => {
  purchase?.classList.remove(...Object.values(stages));
  purchase?.classList.add(stages[stage]);
  setTitle('Заявка на покупку');
};

export const initPurchase = (): void => {
  const form = document.getElementById('purchase-form') as HTMLFormElement;

  if (!form) return;

  initForm('purchase-form');

  document
    .getElementById('purchase-to-start')
    ?.addEventListener('click', toStart);

  document.getElementById('send-btn')?.addEventListener('click', () => {
    form.classList.add('check');
    if (form.checkValidity()) {
      const order: IOrder = {
        address: (form.elements.namedItem('address') as HTMLInputElement).value,
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        tel: (form.elements.namedItem('tel') as HTMLInputElement).value,
        orderID: 1,
      };

      sendPurchase(order);
    }
  });
};

export const sendPurchase = async (order: IOrder) => {
  setStage('sending');
  const result = await sendOrder(order);
  if (result.success) {
    setStage('sended');
    form.reset();
  } else {
    setStage('unsuccess');
  }

  setTitle(result.status);
  purchaseResultTxt.innerHTML = result.msg;
};

export const toStart = () => {
  setStage('filling');
};
