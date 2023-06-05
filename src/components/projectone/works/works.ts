import { createLightBox } from '@/libs/lightbox/lightbox';
import type { GalleryData } from '@/libs/lightbox/lightbox';

const mockImg: GalleryData = {
  resolutions: [640, 1920],
  stub: './assets/stub.png',
  images: [
    {
      640: 'https://dummyimage.com/640x480/000/fefefe.png',
      1920: 'https://dummyimage.com/1920x1080/000/fefefe.png',
    },
    {
      640: 'https://dummyimage.com/640x480/6b256b/fff.png',
      1920: 'https://dummyimage.com/1920x1080/6b256b/fff.png',
    },
    {
      640: 'https://dummyimage.com/640x480/6b706b/fff.png',
      1920: 'https://dummyimage.com/1920x1080/6b706b/fff.png',
    },
    {
      640: 'https://dummyimage.com/640x480/6b256b/fff.png',
      1920: 'https://dummyimage.com/1920x1080/6b256b/fff.png',
    },
    {
      640: 'https://dummyimage.com/640x480/6b256b/fff.png',
      1920: 'https://dummyimage.com/1920x1080/6b256b/fff.png',
    },
  ],
};

export const initWorks = () => {
  document
    .querySelectorAll('.work-card__img')
    ?.forEach((workCard: HTMLElement) => {
      workCard.addEventListener('click', () => {
        createLightBox(mockImg, Number(workCard.dataset.idx) || 0);
      });
    });
};
