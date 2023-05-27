import { START_ANIMATION_DURATION } from '@/ts/constants';

function removePreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  setTimeout(() => {
    document.body.classList.remove('no-scroll');
    document.body.classList.add('start-animation');

    setTimeout(() => {
      preloader.remove();
      document.body.classList.add('animating');
    }, 50);

    setTimeout(() => {
      document.body.classList.remove('start-animation', 'animating');
    }, START_ANIMATION_DURATION);
  }, 500);
}

export function preloaderInit() {
  if (document.readyState === 'complete') {
    removePreloader();
    return;
  }

  window.addEventListener('load', removePreloader, { once: true });
}
