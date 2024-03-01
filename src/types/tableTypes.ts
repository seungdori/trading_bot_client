export type IDataTable = {
  id: 'history' | 'assets';
  displayName: string;
  component: React.ReactNode;
};

export type IAssetsTable = {
  coinName: string; // 코인명
  initPrice: number; // 진입가격
  currentPrice: number; // 현재가
  amount: number; // 보유수량
  rateOfReturn: number; // 수익률
  sellPrice: number; // 손절가
  tp1: number; // TP1
  tp2: number; // TP2
  tp3: number; // TP3
  value: number; // 가치
};
