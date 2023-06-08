export function scrollBarWidth(): void {
  const t_div = document.createElement('div');
  t_div.style.overflowY = 'scroll';
  t_div.style.width = '50px';
  t_div.style.height = '50px';
  document.body.append(t_div);
  const scrollWidth = t_div.offsetWidth - t_div.clientWidth;
  document.body.style.setProperty('--scrollbar-width', `${scrollWidth}px`);
  t_div.remove();
}

export function autoResize(id: string): void {
  function setHeight(textarea: HTMLTextAreaElement): void {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  const textarea = document.getElementById(id) as HTMLTextAreaElement | null;
  if (!textarea) return;
  textarea.rows = 1;
  textarea.style.overflowY = 'hidden';
  textarea.addEventListener('input', () => setHeight(textarea));
  setTimeout(setHeight, 100, textarea);
}

export function smothScrollTo(to: number = 0, duration: number = 700): void {
  const element = document.scrollingElement || document.documentElement;
  const start = element.scrollTop;
  const change = to - start;
  const startDate = +new Date();
  // t = current time
  // b = start value
  // c = change in value
  // d = duration
  const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  };
  const animateScroll = () => {
    const currentDate = +new Date();
    const currentTime = currentDate - startDate;
    element.scrollTop = easeInOutQuad(currentTime, start, change, duration);
    if (currentTime < duration) {
      requestAnimationFrame(animateScroll);
    } else {
      element.scrollTop = to;
    }
  };

  animateScroll();
}

export const disableBodyScroll = (): void => {
  document.body.classList.add('no-scroll');
};

export const enableBodyScroll = (): void => {
  document.body.classList.remove('no-scroll');
};
