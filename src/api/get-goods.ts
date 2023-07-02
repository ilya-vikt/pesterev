export type TGoodsData = {
  title: string;
  characteristics: string;
  src: string;
  srcset: string;
  alt: string;
  reserved: boolean;
  price: string;
  permalink: string;
  promo_price?: string;
  isLandscape: boolean;
};

type TGoodsList = {
  partSize: number;
  goodsList: TGoodsData[];
};

declare global {
  interface Window {
    getgoodsConfig: { baseUrl: string };
  }
}
export let goodsList: TGoodsList | null = null;

async function fetchGoods(url: string) {
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Network error');
  }
}

async function getGoodsList(url: string) {
  if (goodsList) return goodsList;
  const result = await fetchGoods(url);
  goodsList = result;
  return goodsList;
}

export function getPartGoods(url: string) {
  return getGoodsList(url).then((goods) => {
    return goods.goodsList.splice(0, goods.partSize);
  });
}
