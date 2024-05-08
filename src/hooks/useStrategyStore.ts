import {
  useBinanceStateStore,
  useBitgetStateStore,
  useBithumbStateStore,
  useUpbitStateStore,
  useOkxStateStore,
  useOkxSpotStateStore,
  useBinancespotStateStore,
  useBitgetSpotStateStore,
} from '@/store/strategyStore.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';

export const useStrategyStore = () => {
  const { exchange } = useExchangeStore();
  console.log('Current exchange:', exchange);

  const binanceStrategyStore = useBinanceStateStore();
  const bithumbStrategyStore = useBithumbStateStore();
  const upbitStrategyStore = useUpbitStateStore();
  const bitgetStrategyStore = useBitgetStateStore();
  const okxStrategyStore = useOkxStateStore();
  const okxSpotStrategyStore = useOkxSpotStateStore();
  const binanceSpotStrategyStore = useBinancespotStateStore();
  const bitgetSpotStrategyStore = useBitgetSpotStateStore();

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
    case 'okx_spot':
      return { exchange, ...okxSpotStrategyStore };
    case 'binance_spot':
      return { exchange, ...binanceSpotStrategyStore };
    case 'bitget_spot':
      return { exchange, ...bitgetSpotStrategyStore };
    default:
      throw new Error('Exchange not found');
  }
};
