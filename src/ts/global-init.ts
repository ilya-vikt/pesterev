import { scrollBarWidth } from '@ts/modules/functions';
import { headerInit } from '@/components/header/header';
import { preloaderInit } from '@/components/preloader/preloader';
import { footerInit } from '@/components/footer/footer';

export const globalInit = (): void => {
  scrollBarWidth();
  headerInit();
  preloaderInit();
  footerInit();
};
