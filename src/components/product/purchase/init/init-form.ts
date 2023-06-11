import { initForm } from '@/ts/form-init';
import { purchaseState } from '@/components/product/purchase/stages';

export const initPurchaseForm = (): void => {
  const form = document.getElementById('purchase-form') as HTMLFormElement;
  const button = document.getElementById('send-btn');

  if (!form || !button) return;

  form
    .querySelector('.purchase__reset')
    ?.addEventListener('click', () => purchaseState.reset());

  initForm('purchase-form');

  button.addEventListener('click', () => {
    form.classList.add('check');
    if (form.checkValidity()) {
      purchaseState.nextStage();
    }
  });
};
