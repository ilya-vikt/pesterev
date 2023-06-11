import Swiper, { Navigation, Autoplay } from 'swiper';
import type { SwiperOptions } from 'swiper/types';

export const initSlider = (id: string): void => {
  const swiperConfig: SwiperOptions = {
    slidesPerView: 1,
    spaceBetween: 32,
    // autoplay: {
    //   delay: 5000,
    // },
    navigation: {
      prevEl: '.slider-btns__prev',
      nextEl: '.slider-btns__next',
    },
    loop: true,
  };

  Swiper.use([Navigation, Autoplay]);
  const slider = new Swiper(id, swiperConfig);
  slider.autoplay.pause();
  // setTimeout(slider.autoplay.run, START_ANIMATION_DURATION);
};
