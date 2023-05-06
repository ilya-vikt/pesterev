import { scrollBarWidth } from '@ts/modules/functions';
import { headerInit } from '@/components/header/header';

export const globalInit = (): void => {
  scrollBarWidth();
  headerInit();
};
