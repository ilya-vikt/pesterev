import type { IOrder } from '@/api/send-order';
import { sendOrder } from '@/api/send-order';
import { purchaseState } from '@/components/product/purchase/stages';

export const sendHandler = async (order: IOrder) => {
  const result = await sendOrder(order);
  purchaseState.nextStage(result);
};
