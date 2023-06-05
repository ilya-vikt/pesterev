import Swiper, { Navigation, Zoom, Lazy } from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import { setBlur } from '@/ts/modules/blur';

type TImgRecord = Record<number, string>;
type TBreakpoint = number;
type TImgBreakpoints = TBreakpoint[];

export interface GalleryData {
  resolutions: TImgBreakpoints;
  stub: string;
  images: TImgRecord[];
}

let lightbox: HTMLElement | null = null;
let slider: Swiper = null;
Swiper.use([Navigation, Zoom, Lazy]);

function createSrcSet(img: TImgRecord, breakpoints: TImgBreakpoints) {
  let srcSet = 'data-srcset="';
  breakpoints.forEach((breakpoint, idx) => {
    srcSet += `${img[breakpoint]} ${breakpoint}w${
      idx === breakpoints.length - 1 ? '"' : ', '
    }`;
  });
  return srcSet;
}

function createMarkup(data: GalleryData) {
  let markup = `<div class="lightbox__container container">
  <button id="close-gallery" class="lightbox__close">
    <svg>
      <use href="./assets/sprite.svg#cross"></use>
    </svg>
  </button>
  <div class="lightbox__slider swiper">
    <div class="lightbox__controls">
      <button class="lightbox__prev btn-slider"><span class="sr-only">Предыдущий слайд</span>
        <svg>
          <use href="./assets/sprite.svg#arrow_left_xs"></use>
        </svg>
      </button>
      <button class="lightbox__next btn-slider"><span class="sr-only">Следующий слайд</span>
        <svg>
          <use href="./assets/sprite.svg#arrow_right_xs"></use>
        </svg>
      </button>
    </div>
    <div class="swiper-wrapper">`;

  const maxResolution = data.resolutions[data.resolutions.length - 1];
  data.images.forEach((img) => {
    markup += `<div class="lightbox__slide swiper-slide">
    <div class="swiper-zoom-container">
      <span class="swiper-lazy-preloader loader-spinner"></span>
      <img class="swiper-lazy" data-src="${img[maxResolution]}" srcset="${
      data.stub
    }"  ${createSrcSet(img, data.resolutions)}>
    </div>
  </div>`;
  });

  markup += '</div></div></div>';
  return markup;
}

async function destroyLightBox() {
  slider.destroy();
  slider = null;
  lightbox.classList.remove('lightbox--visible');
  await setBlur(lightbox, 'out');
  lightbox.remove();
  lightbox = null;
  document.body.classList.remove('no-scroll');
}

export function createLightBox(data: GalleryData, slideId: number) {
  lightbox = document.createElement('div');
  lightbox.classList.add('lightbox', 'lightbox--visible');
  lightbox.innerHTML = createMarkup(data);
  document.body.classList.add('no-scroll');
  document.body.append(lightbox);
  setBlur(lightbox, 'in');
  const params: SwiperOptions = {
    navigation: {
      nextEl: '.lightbox__next',
      prevEl: '.lightbox__prev',
    },
    zoom: {
      minRatio: 1,
      maxRatio: 3,
      zoomedSlideClass: 'lightbox__slide--zoomed',
    },
    a11y: { enabled: false },
    lazy: {
      loadOnTransitionStart: false,
      loadPrevNext: true,
    },
    loop: true,
  };

  slider = new Swiper('.lightbox__slider', params);
  slider.slideTo(+slideId + 1, 0);
  lightbox
    .querySelector('.lightbox__close')
    ?.addEventListener('click', destroyLightBox);
}
