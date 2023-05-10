const menu: HTMLElement = document.getElementById('menu');
const menuBtn: HTMLElement = document.getElementById('menu-btn');
const backdropSupport = CSS.supports('backdrop-filter', 'blur()');
const blocksToBlur = [...document.querySelectorAll('.need-blur')];
let menuActive = false;

function animateBlur(element: HTMLElement, direction: 'in' | 'out'): void {
  let start = performance.now();
  const duration = 300;

  function step(timestamp: number): void {
    let progress = (timestamp - start) / duration;
    if (progress > 1) progress = 1;

    let blurValue: number;
    if (direction === 'in') {
      blurValue = easeOut(progress) * 50;
    } else {
      blurValue = (1 - easeOut(progress)) * 50;
    }
    element.style.backdropFilter = `blur(${blurValue}px)`;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

function easeOut(progress: number): number {
  return Math.pow(--progress, 5) + 1;
}

const toggleMenu = () => {
  const noScrollClass = 'no-scroll';
  const blurClass = 'blur';
  const menuActiveClass = 'menu--active';
  const btnActiveClass = 'header__btn--active';

  if (menuActive) {
    document.body.classList.remove(noScrollClass);
    menu.classList.remove(menuActiveClass);
    menuBtn.classList.remove(btnActiveClass);

    if (!backdropSupport) {
      blocksToBlur.forEach((block) => block.classList.remove(blurClass));
    } else {
      animateBlur(menu, 'out');
    }
  } else {
    document.body.classList.add(noScrollClass);
    menu.classList.add(menuActiveClass);
    menuBtn.classList.add(btnActiveClass);

    if (!backdropSupport) {
      blocksToBlur.forEach((block) => block.classList.add(blurClass));
    } else {
      animateBlur(menu, 'in');
    }
  }
  menuActive = !menuActive;
};

export const headerInit = () => {
  document.querySelector('.header__btn')?.addEventListener('click', toggleMenu);
};
