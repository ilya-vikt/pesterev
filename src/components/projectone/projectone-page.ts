import { initSlider } from '@/components/projectone/hero/hero';
import { initWorks } from '@/components/projectone/works/works';

const initGoBack = () => {
  const goBack = document.getElementById('go-back') as HTMLLinkElement;
  if (!goBack) return;

  if (document.referrer.includes(window.location.hostname)) {
    goBack.href = document.referrer;
    goBack.addEventListener('click', (e) => {
      e.preventDefault();
      window.history.back();
    });
  } else {
    goBack.remove();
    document.querySelector('.overlay')?.classList.add('overlay--shift');
  }
};

export const projectoneInit = () => {
  initGoBack();
  initSlider();
  initWorks();
};
