import Swiper, { Navigation, Autoplay } from 'swiper';
import type { SwiperOptions } from 'swiper/types';

export const initSlider = () => {
  const swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    autoplay: {
      delay: 5000,
    },
    navigation: {
      prevEl: '.slider-btns__prev',
      nextEl: '.slider-btns__next',
    },
    loop: true,
  };

  Swiper.use([Navigation, Autoplay]);
  const slider = new Swiper('.main-hero__slider', swiperConfig);
  slider.autoplay.pause();
  setTimeout(slider.autoplay.run, 3000);
};
