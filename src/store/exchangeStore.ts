import { createEnumParam, useQueryParam, withDefault } from 'use-query-params';
import { Exchange } from '@/types/exchangeTypes.ts';

const ExchangeParam = withDefault(
  createEnumParam<Exchange>(['binance', 'upbit', 'bithumb', 'bitget', 'okx', 'binance_spot', 'bitget_spot', 'okx_spot']),
  'binance' as const,
  false,
);

/**
 * @description - Get or set the exchange query param
 * @example - http://localhost:1420/?exchange=upbit
 */
export const useExchangeStore = (componentId?: string) => {
  const key = componentId ? `exchange-${componentId}` : 'exchange';
  const [exchange, setExchange] = useQueryParam(key, ExchangeParam);
  if (!exchange) {
    throw new Error('Exchange is not set');
  }
  return { exchange, setExchange };
};
