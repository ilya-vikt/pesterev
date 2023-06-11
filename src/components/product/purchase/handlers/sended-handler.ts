import type { TOrderResult } from '@/api/send-order';
import { setTitle } from '@/components/share/aside-panel/aside-panel';
import { purchaseState } from '@/components/product/purchase/stages';

const form = document.getElementById('purchase-form') as HTMLFormElement;
const purchaseResult = document.getElementById('purchase-msg');

export const sendedHandler = (result: TOrderResult) => {
  if (!purchaseResult) return;
  setTitle(result.status);
  purchaseResult.innerHTML = result.msg;
  if (result.success) {
    form.reset();
  } else {
    purchaseState.setUnsuccess();
  }
};
