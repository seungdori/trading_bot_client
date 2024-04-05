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
  OKX: {
    NAME: '비트겟',
    EXCHANGE: 'okx',
  },
} as const;

export const DEFAULT_EXCHANGE = EXCHANGE.UPBIT.EXCHANGE;

export const DEFAULT_AI_SEARCH_SYMBOL_COUNT = 0;

export const DEFAULT_AI_SEARCH_CURRENT_SYMBOL = 'x';
