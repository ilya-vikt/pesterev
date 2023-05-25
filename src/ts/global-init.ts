import { scrollBarWidth } from '@ts/modules/functions';
import { headerInit } from '@/components/header/header';
import { preloaderInit } from '@/components/preloader/preloader';

export const globalInit = (): void => {
  scrollBarWidth();
  headerInit();
  preloaderInit();
};
