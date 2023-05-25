function removePreloader() {
  const preloader = document.getElementById('preloader');
  if (!preloader) return;

  setTimeout(() => {
    document.body.classList.remove('no-scroll');
    document.body.classList.add('start-animation');
    preloader.remove();

    setTimeout(() => {
      document.body.classList.add('animating');
    }, 50);

    setTimeout(() => {
      document.body.classList.remove('start-animation', 'animating');
    }, 3000);
  }, 500);
}

export function preloaderInit() {
  if (document.readyState === 'complete') {
    removePreloader();
    return;
  }

  window.addEventListener('load', removePreloader, { once: true });
}
