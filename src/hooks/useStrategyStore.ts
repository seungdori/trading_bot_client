import {
  useBinanceStateStore,
  usebitgetStateStore,
  useBithumbStateStore,
  useUpbitStateStore,
  useokxStateStore,
} from '@/store/strategyStore.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';

export const useStrategyStore = () => {
  const { exchange } = useExchangeStore();

  const binanceStrategyStore = useBinanceStateStore();
  const bithumbStrategyStore = useBithumbStateStore();
  const upbitStrategyStore = useUpbitStateStore();
  const bitgetStrategyStore = usebitgetStateStore();
  const okxStrategyStore = useokxStateStore();

  switch (exchange) {
    case 'binance':
      return { exchange, ...binanceStrategyStore };
    case 'bithumb':
      return { exchange, ...bithumbStrategyStore };
    case 'upbit':
      return { exchange, ...upbitStrategyStore };
    case 'bitget':
      return { exchange, ...bitgetStrategyStore };
    case 'okx':
      return { exchange, ...okxStrategyStore };
    default:
      throw new Error('Exchange not found');
  }
};
