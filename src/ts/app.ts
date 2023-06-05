import { mainInit } from '@/components/main/main-page';
import { projectoneInit } from '@/components/projectone/projcetone-page';
import { globalInit } from '@ts/global-init';

globalInit();

const pageName: string | null =
  document.getElementById('config-data')?.dataset.pageName || null;

switch (pageName) {
  case 'main':
    mainInit();
    break;
  case 'projectone':
    projectoneInit();
}
