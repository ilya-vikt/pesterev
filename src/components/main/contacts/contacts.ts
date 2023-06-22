import { IMsg, sendMessage } from '@/api/send-message';
import { initForm } from '@/ts/form-init';
import { autoResize } from '@/ts/modules/functions';

export const initContactsForm = () => {
  const form = document.getElementById('contacts-form') as HTMLFormElement;
  const communicator = document.getElementById(
    'contacts-communicator'
  ) as HTMLDivElement;
  const msgBlock = document.getElementById('contacts-msg') as HTMLDivElement;
  const sendBtn = form.querySelector('#send-btn') as HTMLButtonElement;
  const toStartBtn = document.getElementById(
    'contacts-to-start'
  ) as HTMLButtonElement;

  if (!form || !communicator || !msgBlock || !sendBtn || !toStartBtn) return;

  initForm(form);

  const stages = {
    filling: 'main-contacts__communicator--filling',
    sending: 'main-contacts__communicator--sending',
    sended: 'main-contacts__communicator--sended',
  } as const;

  const setStage = (stage: keyof typeof stages): void => {
    communicator.classList.remove(...Object.values(stages));
    communicator.classList.add(stages[stage]);
  };

  toStartBtn.addEventListener('click', () => {
    setStage('filling');
  });

  sendBtn.addEventListener('click', async () => {
    form.classList.add('check');
    if (form.checkValidity()) {
      const order: IMsg = {
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        message: (form.elements.namedItem('message') as HTMLInputElement).value,
      };

      setStage('sending');
      const result = await sendMessage(order);
      msgBlock.innerHTML = result.msg;
      if (result.success) {
        form.reset();
        form.classList.remove('check');
      }
      setStage('sended');
    }
  });

  autoResize('message');
};
