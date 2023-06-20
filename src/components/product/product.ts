import { asidePanelInit } from '@/components/share/aside-panel/aside-panel';
import { goodsInit } from '@/components/product/goods/goods';
import { initGoBack } from '@/ts/goback-init';
import { initPurchase } from '@/components/product/purchase/purchase';

export const productInit = () => {
  asidePanelInit();
  initGoBack();
  goodsInit();
  initPurchase();
};
