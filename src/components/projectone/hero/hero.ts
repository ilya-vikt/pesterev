import { createLightBox } from '@/libs/lightbox/lightbox';
import { initSlider } from '@/ts/slider-init';

export const heroInit = () => {
  const slider = initSlider('#hero-slider');
  document.getElementById('hero-slider').addEventListener('click', () => {
    const sliderData = window.galleries['slider'];
    sliderData && createLightBox(sliderData, slider.activeIndex - 1);
  });
};
