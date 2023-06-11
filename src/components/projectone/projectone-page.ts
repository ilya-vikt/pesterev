import { heroInit } from '@/components/projectone/hero/hero';
import { initWorks } from '@/components/projectone/works/works';
import { initGoBack } from '@/ts/goback-init';

export const projectoneInit = () => {
  initGoBack();
  heroInit();
  initWorks();
};
