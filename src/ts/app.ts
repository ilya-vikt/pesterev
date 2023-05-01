import { mainInit } from '@/components/main/main-page';

const pageName: string | null =
  document.getElementById('config-data')?.dataset.pageName || null;

switch (pageName) {
  case 'main':
    mainInit();
    break;
}
