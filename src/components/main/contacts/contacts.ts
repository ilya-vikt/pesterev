import { IMsg, sendMessage } from '@/api/send-message';
import { initForm } from '@/ts/form-init';
import { autoResize } from '@/ts/modules/functions';

export const initContactsForm = () => {
  let messageText = '';
  const form = document.getElementById('contacts-form') as HTMLFormElement;
  const communicator = document.getElementById(
    'contacts-communicator'
  ) as HTMLDivElement;
  const msgBlock = document.getElementById('contacts-msg') as HTMLDivElement;
  const sendBtn = form.querySelector('#send-btn') as HTMLButtonElement;
  const toStartBtn = document.getElementById(
    'contacts-to-start'
  ) as HTMLButtonElement;
  const textarea = form.querySelector('#message') as HTMLTextAreaElement;

  if (
    [form, communicator, msgBlock, sendBtn, toStartBtn, textarea].some(
      (el) => !el
    )
  ) {
    return;
  }

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
    if (messageText) {
      textarea.value = messageText;
      textarea.dispatchEvent(new Event('input'));
    }
    setStage('filling');
  });

  sendBtn.addEventListener('click', async () => {
    form.classList.add('check');
    if (form.checkValidity()) {
      const formData = new FormData(form);
      const order: IMsg = {
        email: (form.elements.namedItem('email') as HTMLInputElement).value,
        name: (form.elements.namedItem('name') as HTMLInputElement).value,
        message: (form.elements.namedItem('message') as HTMLInputElement).value,
        city: (form.elements.namedItem('city') as HTMLInputElement).value,
        _wpnonce: (form.elements.namedItem('_wpnonce') as HTMLInputElement)
          .value,
      };

      messageText = textarea.value;
      textarea.value = ' ';
      textarea.dispatchEvent(new Event('input'));
      form.classList.remove('check');

      setStage('sending');
      const result = await sendMessage(order);
      msgBlock.innerHTML = result.msg;
      if (result.success) {
        form.reset();
        messageText = '';
      }
      setStage('sended');
    }
  });

  autoResize('message');
};
