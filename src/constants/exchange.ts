export const EXCHANGE = {
  BINANCE: {
    NAME: '바이낸스',
    EXCHANGE: 'binance',
  },
  BITHUMB: {
    NAME: '빗썸',
    EXCHANGE: 'bithumb',
  },
  UPBIT: {
    NAME: '업비트',
    EXCHANGE: 'upbit',
  },
} as const;

// Utility type to extract PATH values as a union type
type PathValues<T> = {
  [K in keyof T]: T[K] extends { EXCHANGE: infer P } ? P : never;
}[keyof T];

export type ExchangeType = PathValues<typeof EXCHANGE>;
