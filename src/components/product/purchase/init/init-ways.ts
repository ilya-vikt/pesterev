import { purchaseState } from '@/components/product/purchase/stages';

export const initWays = (): void => {
  const btn = document.getElementById('way-website');
  if (!btn) return;

  btn.addEventListener('click', () => purchaseState.nextStage());
};
