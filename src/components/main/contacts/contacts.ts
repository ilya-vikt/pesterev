import { autoResize } from '@/ts/modules/functions';

export const initContactsForm = () => {
  const form = document.getElementById('contact-form');

  form.addEventListener('submit', (e) => {
    console.log('submited');

    e.preventDefault();
  });
  if (!form) return;
  console.log('bla');
  const button = form.querySelector('#send-btn');
  button?.addEventListener('click', () => {
    form.classList.add('check');
  });

  autoResize('message');
};
