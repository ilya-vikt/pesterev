import type { IOrder } from '@/api/send-order';
import { sendOrder } from '@/api/send-order';
import { initForm } from '@/ts/form-init';

export const initPurchase = (): void => {
  const drover = document.getElementById('aside-panel');
  const form = document.getElementById('purchase-form') as HTMLFormElement;
  const purchaseRequest = document.getElementById(
    'purchase-request'
  ) as HTMLDivElement;
  const msgBlock = document.getElementById('purchase-msg') as HTMLDivElement;
  const sendBtn = document.getElementById('send-btn') as HTMLButtonElement;
  const toStartBtn = document.getElementById(
    'purchase-to-start'
  ) as HTMLButtonElement;

  if ([form, msgBlock, sendBtn, toStartBtn, drover].some((el) => !el)) {
    return;
  }

  initForm(form, ['address', 'email', 'name', 'tel']);

  const stages = {
    filling: 'purchase__request--filling',
    sending: 'purchase__request--sending',
    sended: 'purchase__request--sended',
    fail: 'purchase__request--fail',
  } as const;

  const setStage = (stage: keyof typeof stages): void => {
    purchaseRequest.classList.remove(...Object.values(stages));
    purchaseRequest.classList.add(stages[stage]);
  };

  toStartBtn.addEventListener('click', () => {
    setStage('filling');
  });

  sendBtn.addEventListener('click', async () => {
    form.classList.add('check');
    if (form.checkValidity()) {
      const order: IOrder = {
        id: parseInt(
          (form.elements.namedItem('goods') as HTMLInputElement).value
        ),
        address: (form.elements.namedItem('address') as HTMLInputElement).value,
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        tel: (form.elements.namedItem('tel') as HTMLInputElement).value,
        _wpnonce: (form.elements.namedItem('_wpnonce') as HTMLInputElement)
          .value,
      };

      form.classList.remove('check');
      setStage('sending');
      drover.classList.add('aside-panel--lock');
      const result = await sendOrder(order);

      msgBlock.innerHTML = result.msg;
      if (result.success) {
        form.reset();
        setStage('sended');
        document
          .querySelectorAll('.buy-block')
          .forEach((el) => el.classList.add('buy-block--reserved'));
      } else {
        setStage('fail');
      }
      drover.classList.remove('aside-panel--lock');
    }
  });
};
