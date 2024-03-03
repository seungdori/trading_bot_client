import { z } from 'zod';
import { AssetsData } from '@/types/tableTypes.ts';
import { generateRandomAssetsTableRow, getnerateRandomTransactionLog } from '@/helper/typia/generated/mock.ts';
import { TradingSearchParamsSchema } from '@/schemas/searchParamsSchema.ts';
import { StrategyState } from '@/store/strategyStore.ts';
import { getUpbitWallet } from '@/components/api/upbitClient.ts';
import BigNumber from 'bignumber.js';

// Todo: refactor
export async function getAssetsData(): Promise<AssetsData[]> {
  const data: AssetsData[] = Array.from({ length: 30 }, () => generateRandomAssetsTableRow());
  await new Promise((res) => setTimeout(res, 1000));

  const { exchange, krw, withOutKrw } = await getUpbitWallet();

  console.log(`[ASSETS DATA]`, krw, withOutKrw);

  const krwAsset: AssetsData = {
    coinName: 'KRW',
    initPrice: 1,
    currentPrice: +krw.balance,
    amount: BigNumber(+krw.balance),
    rateOfReturn: 1,
    sellPrice: 1,
    tp1: 1,
    tp2: 1,
    tp3: 1,
    value: +krw.balance,
  };
  const assets: AssetsData[] = withOutKrw.map((item) => {
    return {
      coinName: item.currency,
      initPrice: +(+item.avg_buy_price).toFixed(5),
      currentPrice: +(+item.balance).toFixed(5),
      amount: BigNumber(+(+item.balance)),
      rateOfReturn: +(+item.avg_buy_price).toFixed(5),
      sellPrice: +(+item.avg_buy_price).toFixed(5),
      tp1: +(+item.avg_buy_price).toFixed(5),
      tp2: +(+item.avg_buy_price).toFixed(5),
      tp3: +(+item.avg_buy_price).toFixed(5),
      value: +item.balance * +item.avg_buy_price,
    };
  });

  console.log(`[getAssetsData] data`, data);
  return [krwAsset, ...assets]; // Todo: remove
  // return data;
}

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
