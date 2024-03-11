import { z } from 'zod';
import { CustomStrategySchema, EnterStrategySchema } from '@/schemas/exchangeSchema.ts';
import { createEnumParam, NumberParam, useQueryParams, withDefault } from 'use-query-params';
import { useExchangeStore } from '@/store/exchangeStore.ts';

// type Exchange = z.infer<typeof ExchangeSchema>;
type EnterStrategy = z.infer<typeof EnterStrategySchema>;
type CustomStrategy = z.infer<typeof CustomStrategySchema>;
// type Leverage = number;
// type EnterSymbol = z.infer<typeof EnterSymbolSchema>;

const LEVERAGE_KEY = 'leverage';
const DEFAULT_LEVERAGE = 10;

export function saveLeverage(leverage: number) {
  localStorage.setItem(LEVERAGE_KEY, leverage.toString());
}

export function defaultLeverage(): number {
  const leverage = localStorage.getItem(LEVERAGE_KEY);

  if (leverage) {
    return +leverage;
  }

  saveLeverage(DEFAULT_LEVERAGE);
  return DEFAULT_LEVERAGE;
}

export const useBinanceStateStore = () => {
  const [query, setQuery] = useQueryParams({
    leverage: withDefault(NumberParam, defaultLeverage()),
    enterStrategy: withDefault(createEnumParam<EnterStrategy>(['long', 'short', 'long-short']), 'long' as const),
    customStrategy: withDefault(createEnumParam<CustomStrategy>(['전략1', '전략2', '전략3']), '전략1' as const),
    enterSymbolAmount: withDefault(NumberParam, 10),
    enterSymbolCount: withDefault(NumberParam, 500),
  });

  return {
    store: query,
    setStore: setQuery,
  };
};

export type BinanceStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useBinanceStateStore>;

export const useUpbitStateStore = () => {
  const [query, setQuery] = useQueryParams({
    enterStrategy: withDefault(createEnumParam<EnterStrategy>(['long', 'short', 'long-short']), 'long' as const),
    customStrategy: withDefault(createEnumParam<CustomStrategy>(['전략1', '전략2', '전략3']), '전략1' as const),
    enterSymbolAmount: withDefault(NumberParam, 10),
    enterSymbolCount: withDefault(NumberParam, 500),
  });

  return {
    store: query,
    setStore: setQuery,
  };
};

export type UpbitStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useUpbitStateStore>;

export const useBithumbStateStore = () => {
  const [query, setQuery] = useQueryParams({
    enterStrategy: withDefault(createEnumParam<EnterStrategy>(['long', 'short', 'long-short']), 'long' as const),
    customStrategy: withDefault(createEnumParam<CustomStrategy>(['전략1', '전략2', '전략3']), '전략1' as const),
    enterSymbolAmount: withDefault(NumberParam, 10),
    enterSymbolCount: withDefault(NumberParam, 500),
  });

  return {
    store: query,
    setStore: setQuery,
  };
};

export type BithumbStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useBithumbStateStore>;
//
// export const useBinanceStrategyStore = create<ExchangeStateStore>((set) => ({
//   exchange: 'binance',
//   leverage: 1,
//   enterStrategy: 'long',
//   customStrategy: '전략1',
//   enterSymbol: { enterSymbolAmount: 10, enterSymbolCount: 500 },
//   setLeverage: (leverage) => set({ leverage }),
//   setEnterSymbol: (enterSymbol) => set({ enterSymbol }),
//   setEnterStrategy: (enterStrategy) => set({ enterStrategy }),
//   setCustomStrategy: (customStrategy) => set({ customStrategy }),
// }));
//
// export const useBithumbStrategyStore = create<ExchangeStateStore>((set) => ({
//   exchange: 'bithumb',
//   leverage: 1,
//   enterStrategy: 'long',
//   customStrategy: '전략1',
//   enterSymbol: { enterSymbolAmount: 10, enterSymbolCount: 500 },
//   setLeverage: (leverage) => set({ leverage }),
//   setEnterSymbol: (enterSymbol) => set({ enterSymbol }),
//   setEnterStrategy: (enterStrategy) => set({ enterStrategy }),
//   setCustomStrategy: (customStrategy) => set({ customStrategy }),
// }));
//
// export const useUpbitStrategyStore = create<ExchangeStateStore>((set) => ({
//   exchange: 'upbit',
//   leverage: 1,
//   enterStrategy: 'long',
//   customStrategy: '전략1',
//   enterSymbol: { enterSymbolAmount: 10, enterSymbolCount: 500 },
//   setLeverage: (leverage) => set({ leverage }),
//   setEnterSymbol: (enterSymbol) => set({ enterSymbol }),
//   setEnterStrategy: (enterStrategy) => set({ enterStrategy }),
//   setCustomStrategy: (customStrategy) => set({ customStrategy }),
// }));

export type ExchangeStateStore = BinanceStateStore | UpbitStateStore | BithumbStateStore;
