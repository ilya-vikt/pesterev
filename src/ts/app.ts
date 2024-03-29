import { mainInit } from '@/components/main/main-page';
import { marketInit } from '@/components/market/market';
import { productInit } from '@/components/product/product';
import { projectoneInit } from '@/components/projectone/projectone-page';
import { globalInit } from '@ts/global-init';

globalInit();

const pageName: string | null =
  document.getElementById('main')?.dataset.pageName || null;

switch (pageName) {
  case 'main':
    mainInit();
    break;
  case 'projectone':
    projectoneInit();
    break;
  case 'market':
    marketInit();
    break;
  case 'product':
    productInit();
    break;
}
