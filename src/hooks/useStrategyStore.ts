import { useParams } from 'react-router-dom';
import { useBinanceStrategyStore, useBithumbStrategyStore, useUpbitStrategyStore } from '@/store/strategyStore.ts';
import { TradingSearchParamsSchema } from '@/schemas/searchParamsSchema.ts';

export const useStrategyStore = () => {
  const params = useParams();
  const { exchange } = TradingSearchParamsSchema.parse(params);

  const binanceStrategyStore = useBinanceStrategyStore();
  const bithumbStrategyStore = useBithumbStrategyStore();
  const upbitStrategyStore = useUpbitStrategyStore();

  switch (exchange) {
    case 'binance':
      return binanceStrategyStore;
    case 'bithumb':
      return bithumbStrategyStore;
    case 'upbit':
      return upbitStrategyStore;
  }
};
