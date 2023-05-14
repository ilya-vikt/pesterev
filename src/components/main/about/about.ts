import {
  KinescopePlayer,
  KinescopeCreateOptions,
} from '@/ts/modules/kinescope';

declare global {
  interface Window {
    videoUrl: string;
  }
}

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
      const hiddenClass = 'main-about__btn--hidden';
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
