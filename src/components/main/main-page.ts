import { initSlider } from './hero/hero';
import { initPlayer, initGallery } from '@/components/main/about/about';
import { initContactsForm } from '@/components/main/contacts/contacts';

  };


  document
    .querySelector('.main-hero__menu')
    ?.addEventListener('click', ({ target }) => {
      if ((target as HTMLElement).tagName !== 'A') return;
      document
        .querySelector('.main-hero__item--active')
        ?.classList.remove('main-hero__item--active');
      (target as HTMLElement)
        .closest('.main-hero__item')
        .classList.add('main-hero__item--active');
    });

export const mainInit = () => {
  initSlider();
  initGallery();
  initPlayer();
  initContactsForm();
};
