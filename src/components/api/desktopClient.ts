import { z } from 'zod';
import { fetch } from '@tauri-apps/api/http';
import { getnerateRandomTransactionLog } from '@/helper/typia/generated/mock.ts';
import { TradingSearchParamsSchema } from '@/schemas/searchParamsSchema.ts';
import { StrategyState } from '@/store/strategyStore.ts';
import { Upbit } from '@/types/exchangeTypes.ts';
import { TradingDataResponseSchema, TradingDataSchema } from '@/schemas/backendSchema.ts';
import { ResponseDto } from '@/types/backendTypes.ts';

export function mockLogin({ username, password }: { username: string; password: string }) {
  console.log(`[mockLogin] username, password`, username, password);
  return true;
}

export async function getTransactionLog(exchange: z.infer<typeof TradingSearchParamsSchema>['exchange']) {
  // Todo: fetch data from server
  console.log(exchange);
  await new Promise((res) => setTimeout(res, 1000));
  return getnerateRandomTransactionLog();
}

export async function startAiSearch({ exchange, enterStrategy }: Pick<StrategyState, 'exchange' | 'enterStrategy'>) {
  console.log(`[startAiSearch] exchange, enterStrategy`, exchange, enterStrategy);
  return true;
}

/**
 * @description Fetch trading data from Upbit
 * @param exchange - 'upbit'
 * @param symbols - e.g. ['KRW-BTC', 'KRW-ETH', 'KRW-DOGE']
 */
export async function fetchUpbitTradingData(
  exchange: Upbit,
  symbols: string[],
): Promise<z.infer<typeof TradingDataResponseSchema>> {
  const endpoint = `http://localhost:8000/trading/${exchange}`;
  // const url = new URL(endpoint);
  const searchParams = symbols.join(',');

  // url.searchParams.append('market_codes', searchParams);
  console.log(`[SEARCH PARAMS]`, searchParams);

  const response = await fetch<ResponseDto<z.infer<typeof TradingDataResponseSchema>>>(
    `${endpoint}/?market_codes=${searchParams}`,
    {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      // query: { market_codes: symbols },
    },
  );

  const backendResponse = response.data;

  console.log(`[UPBIT TRADING DATA FROM BACKEND]`, backendResponse);

  if (backendResponse.success) {
    return backendResponse.data as z.infer<typeof TradingDataSchema>;
  } else {
    // Todo: handle error
    // throw new Error(backendResponse.message);
    return {};
  }
}
