import Swiper, { Navigation, Zoom, Lazy, Keyboard } from 'swiper';
import type { SwiperOptions } from 'swiper/types';
import { setBlur } from '@/ts/modules/blur';
import { disableBodyScroll, enableBodyScroll } from '@/ts/modules/functions';

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
let zoomInBtn: HTMLButtonElement;
let zoomOutBtn: HTMLButtonElement;

Swiper.use([Navigation, Zoom, Lazy, Keyboard]);

function createSrcSet(
  img: TImgRecord,
  breakpoints: TImgBreakpoints,
  zoom: number = 1
) {
  let srcSet = `data-srcset${zoom === 1 ? '' : '-zoom'}="`;
  breakpoints.forEach((breakpoint, idx) => {
    srcSet += `${img[breakpoint]} ${Math.floor(breakpoint / zoom)}w${
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
    }"  ${createSrcSet(img, data.resolutions)} ${createSrcSet(
      img,
      data.resolutions,
      3
    )}
    }>
    </div>
  </div>`;
  });

  markup += `</div>
  <div class="lightbox__zoom">
  <button class="lightbox__zoom-in"><span class="sr-only">Увеличить масштаб</span></button>
  <button class="lightbox__zoom-out" disabled><span class="sr-only">Уменьшить масштаб</span></button>
  </div>
  </div></div>`;
  return markup;
}

async function destroyLightBox() {
  slider.destroy();
  slider = null;
  lightbox.classList.remove('lightbox--visible');
  await setBlur(lightbox, 'out');
  lightbox.remove();
  lightbox = null;
  enableBodyScroll();
}

function zoomHandler(
  slider: Swiper,
  scale: number,
  imageEl: HTMLElement
): void {
  const tmp = imageEl.getAttribute('srcset');
  imageEl.setAttribute('srcset', imageEl.dataset.srcsetZoom);
  imageEl.dataset.srcsetZoom = tmp;
  slider.params.touchRatio = scale === 1 ? 1 : 0;
  zoomInBtn.disabled = scale !== 1;
  zoomOutBtn.disabled = scale === 1;
}

export function createLightBox(data: GalleryData, slideId: number) {
  //Create Markup for the LightBox
  lightbox = document.createElement('div');
  lightbox.classList.add('lightbox', 'lightbox--visible');
  lightbox.innerHTML = createMarkup(data);
  document.body.append(lightbox);

  disableBodyScroll();

  zoomInBtn = document.querySelector('.lightbox__zoom-in');
  zoomOutBtn = document.querySelector('.lightbox__zoom-out');

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
    keyboard: {
      enabled: true,
      onlyInViewport: false,
    },
    lazy: {
      loadOnTransitionStart: false,
      loadPrevNext: true,
    },
    on: {
      zoomChange: zoomHandler,
    },
    loop: true,
  };

  slider = new Swiper('.lightbox__slider', params);
  slider.slideTo(1 + Number(slideId), 0);
  lightbox
    .querySelector('.lightbox__close')
    ?.addEventListener('click', destroyLightBox);

  document.addEventListener('keydown', ({ key }) => {
    if (key === 'Escape') {
      destroyLightBox();
    }
  });

  zoomInBtn?.addEventListener('click', () => {
    slider.zoom.in();
  });

  zoomOutBtn?.addEventListener('click', () => {
    slider.zoom.out();
  });
}
