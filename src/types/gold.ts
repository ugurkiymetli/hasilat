export interface Direction {
  alis_dir: string;
  satis_dir: string;
}

export interface GoldPrice {
  code: string;
  alis: string;
  satis: string;
  tarih: string;
  dir: Direction;
  dusuk: number;
  yuksek: number;
  kapanis: number;
}

export interface GoldPricesData {
  [key: string]: GoldPrice;
}

export interface GoldPricesResponse {
  meta: {
    time: number;
    tarih: string;
  };
  data: GoldPricesData;
}
