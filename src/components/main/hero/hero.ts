import Swiper, { Navigation } from 'swiper';
import type { SwiperOptions } from 'swiper/types';

export const initSlider = () => {
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
};
