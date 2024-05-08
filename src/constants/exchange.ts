export const EXCHANGE = {
  BINANCE: {
    NAME: '바이낸스',
    EXCHANGE: 'binance',
  },
  BINANCE_SPOT: {
    NAME: '바이낸스 현물',
    EXCHANGE: 'binance_spot',
  },
  BITHUMB: {
    NAME: '빗썸',
    EXCHANGE: 'bithumb',
  },
  UPBIT: {
    NAME: '업비트',
    EXCHANGE: 'upbit',
  },
  BITGET: {
    NAME: 'BITGET',
    EXCHANGE: 'bitget',
  },
  BITGET_SPOT: {
    NAME: 'BITGET 현물',
    EXCHANGE: 'bitget_spot',
  },
  OKX: {
    NAME: 'OKX',
    EXCHANGE: 'okx',
  },
  OKX_SPOT: {
    NAME: 'OKX현물',
    EXCHANGE: 'okx_spot',
  },

} as const;

export const DEFAULT_EXCHANGE = EXCHANGE.UPBIT.EXCHANGE;

export const DEFAULT_AI_SEARCH_SYMBOL_COUNT = 0;

export const DEFAULT_AI_SEARCH_CURRENT_SYMBOL = 'x';
