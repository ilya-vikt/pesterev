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

  const topBlock = panel.querySelector('.aside-panel__top') as HTMLDivElement;

  const handleResize = () => {
    panel.style.setProperty('--top-panel-height', `${topBlock.offsetHeight}px`);
  };

  handleResize();

  if (topBlock) {
    new ResizeObserver(handleResize).observe(topBlock);
  }

  panel.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).classList.contains('close-trigger')) {
      closePanel();
    }
  });
};
