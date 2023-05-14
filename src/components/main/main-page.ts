import Swiper, { Navigation } from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import { initPlayer } from '@/components/main/about/about';

export const mainInit = () => {
  const swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    navigation: {
      prevEl: '.slider-btns__prev',
      nextEl: '.slider-btns__next',
    },
    loop: true,
  };

  Swiper.use([Navigation]);
  new Swiper('.main-hero__slider', swiperConfig);

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
};

initPlayer();
