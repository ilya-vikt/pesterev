import { showPanel } from '@/components/share/aside-panel/aside-panel';

export const goodsInit = () => {
  document.getElementById('filters-btn')?.addEventListener('click', showPanel);
};
