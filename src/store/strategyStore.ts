import { z } from 'zod';
import { CustomStrategySchema, EnterStrategySchema } from '@/schemas/exchangeSchema.ts';
import { createEnumParam, NumberParam, useQueryParams, withDefault } from 'use-query-params';
import { useExchangeStore } from '@/store/exchangeStore.ts';

export type EnterStrategy = z.infer<typeof EnterStrategySchema>;
export type CustomStrategy = z.infer<typeof CustomStrategySchema>;

const LEVERAGE_KEY = 'leverage';
const DEFAULT_LEVERAGE = 10;

const DEFAULT_ENTER_SYMBOL_AMOUNT = 500;
const DEFAULT_ENTER_SYMBOL_COUNT = 10;

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

export const CustomStrategist = ['전략1', '전략2', '전략3'] as const;
export const EnterStrategist = ['long', 'short', 'long-short'] as const;

export const useBinanceStateStore = () => {
  const [query, setQuery] = useQueryParams({
    leverage: withDefault(NumberParam, defaultLeverage()),
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), 'long' as const),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), '전략1' as const),
    enterSymbolAmount: withDefault(NumberParam, DEFAULT_ENTER_SYMBOL_AMOUNT),
    enterSymbolCount: withDefault(NumberParam, DEFAULT_ENTER_SYMBOL_COUNT),
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
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), 'long' as const),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), '전략1' as const),
    enterSymbolAmount: withDefault(NumberParam, DEFAULT_ENTER_SYMBOL_AMOUNT),
    enterSymbolCount: withDefault(NumberParam, DEFAULT_ENTER_SYMBOL_COUNT),
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
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), 'long' as const),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), '전략1' as const),
    enterSymbolAmount: withDefault(NumberParam, DEFAULT_ENTER_SYMBOL_AMOUNT),
    enterSymbolCount: withDefault(NumberParam, DEFAULT_ENTER_SYMBOL_COUNT),
  });

  return {
    store: query,
    setStore: setQuery,
  };
};

export type BithumbStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useBithumbStateStore>;

export const useBitgetStateStore = () => {
  const [query, setQuery] = useQueryParams({
    leverage: withDefault(NumberParam, defaultLeverage()),
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), 'long' as const),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), '전략1' as const),
    enterSymbolAmount: withDefault(NumberParam, DEFAULT_ENTER_SYMBOL_AMOUNT),
    enterSymbolCount: withDefault(NumberParam, DEFAULT_ENTER_SYMBOL_COUNT),
  });

  return {
    store: query,
    setStore: setQuery,
  };
};

export type BitgetStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useBitgetStateStore>;

export type ExchangeStateStore = BinanceStateStore | UpbitStateStore | BithumbStateStore | BitgetStateStore;
