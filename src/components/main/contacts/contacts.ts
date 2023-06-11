import { initForm } from '@/ts/form-init';
import { autoResize } from '@/ts/modules/functions';

export const initContactsForm = () => {
  const form = document.getElementById('contact-form') as HTMLFormElement;
  if (!form) return;

  initForm('contact-form');

  const button = form.querySelector('#send-btn');
  button?.addEventListener('click', () => {
    form.classList.add('check');
  });

  autoResize('message');
};
