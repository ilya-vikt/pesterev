import { asidePanelInit } from '@/components/share/aside-panel/aside-panel';
import { goodsInit } from './goods/goods';
import { getPartGoods } from '@/api/get-goods';
import type { TGoodsData } from '@/api/get-goods';

const goodsList = document.getElementById(
  'goods-list'
) as HTMLUListElement | null;
const loadObserver = document.getElementById(
  'load-observer'
) as HTMLDivElement | null;
const template = document.getElementById(
  'goods-tamplate'
) as HTMLTemplateElement | null;
const spinner = document.getElementById('spinner') as HTMLDivElement | null;
const errorBlock = document.getElementById(
  'error-block'
) as HTMLDivElement | null;
const retryBtn = document.getElementById(
  'error-block'
) as HTMLButtonElement | null;

let url = '';

//UTILS

const setSpinnerVisible = (visible: boolean): void => {
  if (visible) {
    spinner.classList.add('market-goods__spinner--visible');
  } else {
    spinner.classList.remove('market-goods__spinner--visible');
  }
};

const setErrorBlockVisible = (visible: boolean): void => {
  if (visible) {
    errorBlock.classList.add('market-goods__error--visible');
  } else {
    errorBlock.classList.remove('market-goods__error--visible');
  }
};

const imgLazyLoad = (node: HTMLDivElement): void => {
  const imgContainer = node.querySelector('.img-wrapper');
  const img = imgContainer.querySelector('img');
  img.onload = () => {
    imgContainer.classList.remove('img-wrapper--loading');
  };

  img.srcset = img.dataset.srcset;
  img.removeAttribute('data-srcset');
};

const createNode = (goods: TGoodsData): HTMLElement => {
  const newNode = template.content.cloneNode(true) as HTMLElement;

  if (goods.isLandscape) {
    newNode
      .querySelector('.market-goods__item')
      .classList.add('market-goods__item--landscape');
  }

  (newNode.querySelector('.market-goods__lnk') as HTMLLinkElement).href =
    goods.permalink;
  newNode.querySelector('.work-card__title').innerHTML = goods.title;

  newNode.querySelector('.work-card__params').innerHTML = goods.characteristics;
  const img = newNode.querySelector('.work-card__img img') as HTMLImageElement;
  img.src = goods.src;
  img.dataset.srcset = goods.srcset;
  img.alt = goods.alt;

  imgLazyLoad(newNode as HTMLDivElement);

  if (!goods.reserved) {
    newNode.querySelector('.work-card__lock').remove();
  }

  newNode.querySelector('.market-goods__price').innerHTML = goods.price;
  const promoPrice = newNode.querySelector('.market-goods__promo');
  if (goods.promo_price) {
    newNode
      .querySelector('.market-goods__prices')
      .classList.add('market-goods__prices--has-promo');
    promoPrice.innerHTML = goods.promo_price;
  } else {
    promoPrice.remove();
  }

  return newNode;
};

//end UTILS

const addGoods = () => {
  setSpinnerVisible(true);
  setErrorBlockVisible(false);
  getPartGoods(url)
    .then((goodsPart) => {
      if (goodsPart.length === 0) {
        loadObserver.remove();
      }
      goodsPart.forEach((goods) => {
        const node = createNode(goods);
        goodsList.append(node);
        console.log(node);
      });
      setSpinnerVisible(false);
    })
    .catch(() => {
      setSpinnerVisible(false);
      setErrorBlockVisible(true);
    });
};

function handleIntersection(entries: any) {
  entries.forEach((entry: any) => {
    if (entry.isIntersecting) {
      addGoods();
    }
  });
}

const lazyLoadInit = () => {
  retryBtn.addEventListener('click', addGoods);
  const options = {
    rootMargin: '0px 0px 200px 0px',
    threshold: 0,
  };

  const observer = new IntersectionObserver(handleIntersection, options);
  observer.observe(loadObserver);
};

export const marketInit = () => {
  url = window.getgoodsConfig.baseUrl;
  const queryParams = new URLSearchParams(window.location.search).toString();
  if (queryParams.length > 0) {
    url += `?${queryParams}`;
  }
  asidePanelInit();
  goodsInit();
  lazyLoadInit();
};
