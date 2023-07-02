import { createLightBox } from '@/libs/lightbox/lightbox';
import type { GalleryData } from '@/libs/lightbox/lightbox';

import {
  KinescopePlayer,
  KinescopeCreateOptions,
} from '@/ts/modules/kinescope';

declare global {
  interface Window {
    videoUrl: string;
    galleries: Record<string, GalleryData>;
  }
}

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
  ],
};

export const initPlayer = () => {
  const playerWrapper = document.getElementById('player-wrapper');
  const url = playerWrapper.dataset.url || '';
  const options: KinescopeCreateOptions = {
    url,
    ui: {
      mainPlayButton: false,
      language: 'ru',
    },
  };
  window.Kinescope.IframePlayer.create('player', options).then(
    (player: KinescopePlayer) => {
      const startBtn = document.getElementById('start-btn');
      const hiddenClass = 'btn--hidden';
      const playerPlaying = 'main-about__video--playing';

      player.on(player.Events.Ended, () => {
        startBtn?.classList.remove(hiddenClass);
        playerWrapper?.classList.remove(playerPlaying);
      });
      startBtn?.addEventListener('click', () => {
        player.play();
        startBtn?.classList.add(hiddenClass);
        playerWrapper?.classList.add(playerPlaying);
      });
    }
  );
};

export const initGallery = () => {
  document.getElementById('gallery-btn')?.addEventListener('click', () => {
    createLightBox(window.galleries['about'], 0);
  });
};
