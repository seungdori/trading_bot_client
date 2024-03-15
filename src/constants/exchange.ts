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

export const DEFAULT_EXCHANGE = EXCHANGE.UPBIT.EXCHANGE;
