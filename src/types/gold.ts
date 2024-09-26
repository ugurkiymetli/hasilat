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

export const GOLD_TYPE_NAMES: { [key: string]: string } = {
  ALTIN: "Gram (24 Ayar)",
  AYAR22: "Gram (22 Ayar)",
  CEYREK_YENI: "Çeyrek (Yeni)",
  CEYREK_ESKI: "Çeyrek (Eski)",
  YARIM_YENI: "Yarım (Yeni)",
  YARIM_ESKI: "Yarım (Eski)",
  TEK_YENI: "Tam (Yeni)",
  TEK_ESKI: "Tam (Eski)",
  ATA_YENI: "Ata (Yeni)",
  ATA_ESKI: "Ata (Eski)",
  USDTRY: "USD/TRY",
  EURTRY: "EUR/TRY",
};
