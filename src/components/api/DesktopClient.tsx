import { z } from 'zod';
import { AssetsData } from '@/types/tableTypes.ts';
import { generateRandomAssetsTableRow, getnerateRandomTransactionLog } from '@/helper/typia/generated/mock.ts';
import { TradingSearchParamsSchema } from '@/schemas/searchParamsSchema.ts';

export async function getAssetsData(): Promise<AssetsData[]> {
  const data: AssetsData[] = Array.from({ length: 30 }, () => generateRandomAssetsTableRow());
  await new Promise((res) => setTimeout(res, 6000));
  console.log(`[getAssetsData] data`, data);
  return data;
}

export function mockLogin({ username, password }: { username: string; password: string }) {
  console.log(`[mockLogin] username, password`, username, password);
  return true;
}

export async function getTransactionLog(exchange: z.infer<typeof TradingSearchParamsSchema>['exchange']) {
  console.log(exchange);
  await new Promise((resolve) => setTimeout(resolve, 5000));
  return getnerateRandomTransactionLog();
}
