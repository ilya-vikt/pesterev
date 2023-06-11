import { initPurchaseForm } from '@/components/product/purchase/init/init-form';
import { initWays } from '@/components/product/purchase/init/init-ways';
import { initResult } from '@/components/product/purchase/init/init-result';

export const initPurchase = (): void => {
  initWays();
  initPurchaseForm();
  initResult();
};
