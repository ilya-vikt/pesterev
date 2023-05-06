const menu: HTMLElement = document.getElementById('menu');
const menuBtn: HTMLElement = document.getElementById('menu-btn');
const mainBlock: HTMLElement = document.getElementById('main');
let menuActive = false;

const toggleMenu = () => {
  const noScrollClass = 'no-scroll';
  const blurClass = 'blur';
  const menuActiveClass = 'menu--active';
  const btnActiveClass = 'header__btn--active';

  if (menuActive) {
    document.body.classList.remove(noScrollClass);
    mainBlock.classList.remove(blurClass);
    menu.classList.remove(menuActiveClass);
    menuBtn.classList.remove(btnActiveClass);
  } else {
    document.body.classList.add(noScrollClass);
    mainBlock.classList.add(blurClass);
    menu.classList.add(menuActiveClass);
    menuBtn.classList.add(btnActiveClass);
  }
  menuActive = !menuActive;
};

export const headerInit = () => {
  document.querySelector('.header__btn')?.addEventListener('click', toggleMenu);
};
