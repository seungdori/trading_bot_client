import { createEnumParam, NumberParam, useQueryParams, withDefault } from 'use-query-params';
import { useExchangeStore } from '@/store/exchangeStore.ts';
import {
  CustomStrategist,
  DEFAULT_ENTER_SYMBOL_AMOUNT,
  DEFAULT_ENTER_SYMBOL_COUNT,
  DEFAULT_LEVERAGE,
  EnterStrategist,
} from '@/constants/backend.ts';
import { CustomStrategy, EnterStrategy } from '@/types/backendTypes.ts';

const LEVERAGE_KEY = 'leverage';

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
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), 'long' as const),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), '트랜드' as const),
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
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), '트랜드' as const),
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
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), '트랜드' as const),
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
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), '트랜드' as const),
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
