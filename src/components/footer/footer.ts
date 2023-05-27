import { smothScrollTo } from '@/ts/modules/functions';

export const footerInit = (): void => {
  const btn = document.getElementById('to-top');

  btn &&
    btn.addEventListener('click', () => {
      smothScrollTo(0);
    });
};
