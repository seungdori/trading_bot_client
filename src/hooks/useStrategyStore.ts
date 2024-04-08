import {
  useBinanceStateStore,
  usebitgetStateStore,
  useBithumbStateStore,
  useUpbitStateStore,
} from '@/store/strategyStore.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';

export const useStrategyStore = () => {
  const { exchange } = useExchangeStore();

  const binanceStrategyStore = useBinanceStateStore();
  const bithumbStrategyStore = useBithumbStateStore();
  const upbitStrategyStore = useUpbitStateStore();
  const bitgetStrategyStore = usebitgetStateStore();

  switch (exchange) {
    case 'binance':
      return { exchange, ...binanceStrategyStore };
    case 'bithumb':
      return { exchange, ...bithumbStrategyStore };
    case 'upbit':
      return { exchange, ...upbitStrategyStore };
    case 'bitget':
      return { exchange, ...bitgetStrategyStore };
    default:
      throw new Error('Exchange not found');
  }
};
