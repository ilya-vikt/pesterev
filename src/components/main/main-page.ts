import { initSlider } from './hero/hero';
import { initPlayer, initGallery } from '@/components/main/about/about';
import { initContactsForm } from '@/components/main/contacts/contacts';
import { smothScrollTo } from '@/ts/modules/functions';

const initHeroMenu = () => {
  const getHashFromLnk = (lnk: HTMLLinkElement): string => {
    return new URL((lnk as HTMLLinkElement).href).hash;
  };

  const heroMenu = document.getElementById('hero-menu');
  if (!heroMenu) return;
  const blockMap: Record<string, HTMLElement> = {};
  const menuMap: Record<string, HTMLElement> = {};

  Array.from(heroMenu.getElementsByTagName('A')).forEach((el) => {
    const href = getHashFromLnk(el as HTMLLinkElement);
    if (!href) return;
    const block = document.querySelector(href) as HTMLElement;
    blockMap[href] = block;
    menuMap[href] = el.closest('.main-hero__item') as HTMLElement;
  });

  heroMenu.addEventListener('click', (e) => {
    const lnk = e.target as HTMLElement;
    if (lnk.tagName !== 'A' || lnk.classList.contains('external')) return;
    e.preventDefault();
    const href = getHashFromLnk(lnk as HTMLLinkElement);

    if (!blockMap[href]) return;
    const y = blockMap[href].getBoundingClientRect().top + window.pageYOffset;
    smothScrollTo(y);
  });

  //Intersection Observer
  let activeMenuItem: HTMLElement | null = null;

  const setActiveMenuItem = (id: string): void => {
    const activeClass = 'main-hero__item--active';
    const hash = '#' + id;
    activeMenuItem && activeMenuItem.classList.remove(activeClass);
    if (!menuMap[hash]) return;
    menuMap[hash].classList.add(activeClass);
    activeMenuItem = menuMap[hash];
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveMenuItem(entry.target.id);
        }
      });
    },
    {
      rootMargin: '-30% 0px -69.99% 0px',
    }
  );

  for (const key in blockMap) {
    const value = blockMap[key];
    observer.observe(value);
  }
  observer.observe(document.getElementById('hero'));
};

export const mainInit = () => {
  initHeroMenu();
  initSlider();
  initGallery();
  initPlayer();
  initContactsForm();
};
