import { purchaseState } from '@/components/product/purchase/stages';

export const initResult = () => {
  document
    .getElementById('purchase-result-reset')
    ?.addEventListener('click', purchaseState.reset);
};
