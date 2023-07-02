import { showPanel } from '@/components/share/aside-panel/aside-panel';
import { createLightBox } from '@/libs/lightbox/lightbox';
import { initSlider } from '@/ts/slider-init';

export const goodsInit = () => {
  const slider = initSlider('#product-slider');
  document.getElementById('product-slider').addEventListener('click', () => {
    const sliderData = window.galleries['slider'];
    sliderData && createLightBox(sliderData, slider.activeIndex - 1);
  });
  document
    .querySelectorAll('.buy-btn')
    ?.forEach((btn) => btn.addEventListener('click', showPanel));
};
