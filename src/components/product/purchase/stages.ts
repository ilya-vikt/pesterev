import { sendHandler } from '@/components/product/purchase/handlers/send-handler';
import { sendedHandler } from '@/components/product/purchase/handlers/sended-handler';
import { selectHandler } from '@/components/product/purchase/handlers/select-handler';

type TStage = {
  readonly class: string;
  readonly handler: Function | null;
};

class PurchaseState {
  private stage: number = 0;
  private stages: TStage[] = [];
  private purchaseContainer: HTMLElement;

  constructor(stages: TStage[], purchaseContainer: HTMLElement) {
    this.stages = stages;
    this.purchaseContainer = purchaseContainer;
  }

  private setStage(stage: number, ...args: any[]) {
    this.stages.forEach((stage) => {
      this.purchaseContainer?.classList.remove(`purchase--${stage.class}`);
    });
    this.stage = stage;
    this.purchaseContainer?.classList.add(
      `purchase--${this.stages[stage].class}`
    );
    this.stages[stage].handler && this.stages[stage].handler(...args);
  }

  nextStage(...args: any[]): void {
    this.setStage(this.stage + 1, ...args);
  }

  setUnsuccess(): void {
    this.setStage(this.stages.length - 1);
  }

  reset(): void {
    this.setStage(0);
  }
}

export const purchaseState = new PurchaseState(
  [
    { class: 'select', handler: selectHandler },
    { class: 'prepare', handler: null },
    { class: 'sending', handler: sendHandler },
    { class: 'sended', handler: sendedHandler },
    { class: 'unsuccess', handler: null },
  ],
  document.getElementById('purchase')
);
