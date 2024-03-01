export const EXCHANGE = {
  BINANCE: {
    NAME: '바이낸스',
    PATH: 'binance',
  },
  BITHUMB: {
    NAME: '빗썸',
    PATH: 'bithumb',
  },
  UPBIT: {
    NAME: '업비트',
    PATH: 'upbit',
  },
} as const;

// Utility type to extract PATH values as a union type
type PathValues<T> = {
  [K in keyof T]: T[K] extends { PATH: infer P } ? P : never;
}[keyof T];

export type ExchangeType = PathValues<typeof EXCHANGE>;
