import { fetch } from '@tauri-apps/api/http';
import { Upbit } from '@/types/exchangeTypes.ts';
import { z } from 'zod';
import { TradingDataResponseSchema } from '@/schemas/backendSchema.ts';
import { useQuery } from '@tanstack/react-query';

/**
 * @description Fetch trading data from Upbit
 * @param exchange - 'upbit'
 * @param symbols - e.g. ['KRW-BTC', 'KRW-ETH', 'KRW-DOGE']
 */
async function fetchUpbitTradingData(
  exchange: Upbit,
  symbols: string[],
): Promise<z.infer<typeof TradingDataResponseSchema>> {
  return {};
  const endpoint = ``;
  const response = await fetch<z.infer<typeof TradingDataResponseSchema>>(endpoint, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    query: { exchange, symbols },
  });

  console.log(`[UPBIT TRADING DATA FROM BACKEND]`, response.data);

  return response.data;
}

export const useFetchUpbitTradingData = (exchange: Upbit, symbols: string[]) => {
  return useQuery({
    queryKey: ['upbitTradingData', exchange, symbols],
    queryFn: () => fetchUpbitTradingData(exchange, symbols),
  });
};
