import { setBlur } from '@/ts/modules/blur';

const menu: HTMLElement = document.getElementById('menu');
const menuBtn: HTMLElement = document.getElementById('menu-btn');
let menuActive = false;

const toggleMenu = () => {
  const noScrollClass = 'no-scroll';
  const menuActiveClass = 'menu--active';
  const btnActiveClass = 'header__btn--active';

  if (menuActive) {
    document.body.classList.remove(noScrollClass);
    menu.classList.remove(menuActiveClass);
    menuBtn.classList.remove(btnActiveClass);
    setBlur(menu, 'out');
  } else {
    document.body.classList.add(noScrollClass);
    menu.classList.add(menuActiveClass);
    menuBtn.classList.add(btnActiveClass);
    setBlur(menu, 'in');
  }
  menuActive = !menuActive;
};

export const headerInit = () => {
  document.querySelector('.header__btn')?.addEventListener('click', toggleMenu);
};
