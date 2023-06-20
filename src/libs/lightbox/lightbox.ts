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
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1L19 19" stroke="currentColor" vector-effect="non-scaling-stroke" stroke-width="2" />
    <path d="M1 19L19 1" stroke="currentColor" vector-effect="non-scaling-stroke" stroke-width="2" />
  </svg>
  </button>
  <div class="lightbox__slider swiper">
    <div class="lightbox__controls">
      <button class="lightbox__prev btn-slider"><span class="sr-only">Предыдущий слайд</span>
        <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.33325 7L19.9999 7.00001" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"/>
          <path d="M7 1L1.5 7L7 13" stroke="currentColor" stroke-width="2" vector-effect="non-scaling-stroke"/>
        </svg>
      </button>
      <button class="lightbox__next btn-slider"><span class="sr-only">Следующий слайд</span>
      <svg width="20" height="14" viewBox="0 0 20 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 7L8.2016e-05 7" stroke-width="2" stroke="currentColor" vector-effect="non-scaling-stroke" />
        <path d="M13 1L18.5 7L13 13" stroke-width="2" stroke="currentColor" vector-effect="non-scaling-stroke" />
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
