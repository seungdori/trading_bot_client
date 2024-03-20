import * as typia from 'typia';
import { Asset } from '@/types/exchangeTypes.ts';

type AssetsData = Asset;

export function generateRandomAssetsTableRow(): AssetsData[] {
  console.log(`[generateRandomAssetsTableRow]`);
  const random = typia.random<AssetsData[]>();
  console.log(`[generateRandomAssetsTableRow] random`, random);
  return random;
}

type RandomString = string & typia.tags.MinLength<5000> & typia.tags.MaxLength<10000>;
export function getnerateRandomTransactionLog() {
  const randomLog = typia.random<RandomString>();
  console.log(`[getnerateRandomTransactionLog] random`, randomLog);
  return randomLog;
}
