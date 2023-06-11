import { showPanel } from '@/components/share/aside-panel/aside-panel';
import { initSlider } from '@/ts/slider-init';

export const goodsInit = () => {
  initSlider('#product-slider');
  document
    .querySelectorAll('.buy-btn')
    ?.forEach((btn) => btn.addEventListener('click', showPanel));
};
