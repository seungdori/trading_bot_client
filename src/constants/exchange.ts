export const EXCHANGE = {
  OKX: {
    NAME: 'OKX',
    EXCHANGE: 'okx',
  },
  OKX_SPOT: {
    NAME: 'OKX현물',
    EXCHANGE: 'okx_spot',
  },

} as const;

export const DEFAULT_EXCHANGE = EXCHANGE.OKX.EXCHANGE;

export const DEFAULT_AI_SEARCH_SYMBOL_COUNT = 0;

export const DEFAULT_AI_SEARCH_CURRENT_SYMBOL = 'x';
