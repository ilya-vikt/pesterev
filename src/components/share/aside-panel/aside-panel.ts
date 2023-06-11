import { disableBodyScroll, enableBodyScroll } from '@/ts/modules/functions';

let panel = null as HTMLDivElement;
const showClass = 'aside-panel--visible';

const closePanel = (): void => {
  panel.classList.remove(showClass);
  enableBodyScroll();
};

export const showPanel = (): void => {
  disableBodyScroll();
  panel.classList.add(showClass);
};

export const setTitle = (txt: string): void => {
  const title = document.getElementById('aside-panel-title');
  if (!title) return;
  title.innerHTML = txt;
};

export const asidePanelInit = (): void => {
  panel = document.getElementById('aside-panel') as HTMLDivElement;

  if (!panel) return;
  panel.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).classList.contains('close-trigger')) {
      closePanel();
    }
  });
};
