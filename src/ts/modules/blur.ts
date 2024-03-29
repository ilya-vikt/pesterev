const backdropSupport = CSS.supports('backdrop-filter', 'blur()');
const configBlock = document.getElementById('config-data');
const duration = 300;

function fallbackBlur(direction: 'in' | 'out'): void {
  if (direction === 'in') {
    configBlock.classList.add('popup-backdrop-fallback');
  } else {
    configBlock.classList.remove('popup-backdrop-fallback');
  }
}

function animateBackdrop(element: HTMLElement, direction: 'in' | 'out') {
  let start = performance.now();

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

export async function setBlur(
  element: HTMLElement,
  direction: 'in' | 'out'
): Promise<true> {
  if (direction === 'in') {
    configBlock.classList.add('popup-active');
  } else {
    configBlock.classList.remove('popup-active');
  }

  if (backdropSupport) {
    animateBackdrop(element, direction);
  } else {
    fallbackBlur(direction);
  }
  await new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
  return true;
}
