import { useEffect } from 'react';
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

// EnterStrategy, 그리고 isCustomStrategy에 대한 타입 가드
function isEnterStrategy(value: any): value is EnterStrategy {
  return Object.values(EnterStrategist).includes(value);
}
function isCustomStrategy(value: any): value is CustomStrategy {
  return Object.values(CustomStrategist).includes(value);
}

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
  // 초기 상태를 localStorage에서 로드
  const initialValues = {
    leverage: parseInt(localStorage.getItem('binanceLeverage') ?? '') || defaultLeverage(),
    enterStrategy: isEnterStrategy(localStorage.getItem('binanceEnterStrategy')) ? localStorage.getItem('binanceEnterStrategy') : 'long',
    customStrategy: isCustomStrategy(localStorage.getItem('binanceCustomStrategy')) ? localStorage.getItem('binanceCustomStrategy') : '트랜드',
    enterSymbolAmount: parseInt(localStorage.getItem('binanceEnterSymbolAmount') ?? '') || DEFAULT_ENTER_SYMBOL_AMOUNT,
    enterSymbolCount: parseInt(localStorage.getItem('binanceEnterSymbolCount') ?? '') || DEFAULT_ENTER_SYMBOL_COUNT,
  };

  const [query, setQuery] = useQueryParams({
    leverage: withDefault(NumberParam, initialValues.leverage),
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), initialValues.enterStrategy as EnterStrategy),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), initialValues.customStrategy as CustomStrategy),
    enterSymbolAmount: withDefault(NumberParam, initialValues.enterSymbolAmount),
    enterSymbolCount: withDefault(NumberParam, initialValues.enterSymbolCount),
  });
  // 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('binanceLeverage', query.leverage.toString());
    localStorage.setItem('binanceEnterStrategy', query.enterStrategy);
    localStorage.setItem('binanceCustomStrategy', query.customStrategy);
    localStorage.setItem('binanceEnterSymbolAmount', query.enterSymbolAmount.toString());
    localStorage.setItem('binanceEnterSymbolCount', query.enterSymbolCount.toString());
  }, [query]);

  return {
    store: query,
    setStore: setQuery,
  };
};

export type BinanceStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useBinanceStateStore>;

export const useUpbitStateStore = () => {
  // 초기 상태를 localStorage에서 로드하거나, 없으면 기본 상수 사용
  const initialValues = {
    enterStrategy: localStorage.getItem('upbitEnterStrategy') ?? 'long',
    customStrategy: localStorage.getItem('upbitCustomStrategy') ?? '트랜드',
    enterSymbolAmount: parseInt(localStorage.getItem('upbitEnterSymbolAmount') ?? DEFAULT_ENTER_SYMBOL_AMOUNT.toString()),
    enterSymbolCount: parseInt(localStorage.getItem('upbitEnterSymbolCount') ?? DEFAULT_ENTER_SYMBOL_COUNT.toString()),
  };
  const [query, setQuery] = useQueryParams({
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), initialValues.enterStrategy as EnterStrategy) ,
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), initialValues.customStrategy as CustomStrategy),
    enterSymbolAmount: withDefault(NumberParam, initialValues.enterSymbolAmount),
    enterSymbolCount: withDefault(NumberParam, initialValues.enterSymbolCount),
  });
  
  // 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('upbitEnterStrategy', query.enterStrategy);
    localStorage.setItem('upbitCustomStrategy', query.customStrategy);
    localStorage.setItem('upbitEnterSymbolAmount', query.enterSymbolAmount.toString());
    localStorage.setItem('upbitEnterSymbolCount', query.enterSymbolCount.toString());
  }, [query]);

  return {
    store: query,
    setStore: setQuery,
  };
};

export type UpbitStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useUpbitStateStore>;

export const useBithumbStateStore = () => {
  // localStorage에서 값을 불러오되, null이면 기본값을 사용
  const initialValues = {
    enterStrategy: localStorage.getItem('bithumbEnterStrategy') ?? 'long',
    customStrategy: localStorage.getItem('bithumbCustomStrategy') ?? '트랜드',
    enterSymbolAmount: parseInt(localStorage.getItem('bithumbEnterSymbolAmount') ?? DEFAULT_ENTER_SYMBOL_AMOUNT.toString()),
    enterSymbolCount: parseInt(localStorage.getItem('bithumbEnterSymbolCount') ?? DEFAULT_ENTER_SYMBOL_COUNT.toString()),
  };
  const [query, setQuery] = useQueryParams({
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), initialValues.enterStrategy as EnterStrategy),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), initialValues.customStrategy as CustomStrategy),
    enterSymbolAmount: withDefault(NumberParam, initialValues.enterSymbolAmount),
    enterSymbolCount: withDefault(NumberParam, initialValues.enterSymbolCount),
  });
  // 상태가 변경될 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem('bithumbEnterStrategy', query.enterStrategy);
    localStorage.setItem('bithumbCustomStrategy', query.customStrategy);
    localStorage.setItem('bithumbEnterSymbolAmount', query.enterSymbolAmount.toString());
    localStorage.setItem('bithumbEnterSymbolCount', query.enterSymbolCount.toString());
  }, [query]);
  return {
    store: query,
    setStore: setQuery,
  };
};

export type BithumbStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useBithumbStateStore>;

export const useBitgetStateStore = () => {
  const initialValues = {
    leverage: parseInt(localStorage.getItem('bitgetLeverage') ?? '') || defaultLeverage(),
    enterStrategy: isEnterStrategy(localStorage.getItem('bitgetEnterStrategy')) ? localStorage.getItem('bitgetEnterStrategy') : 'long',
    customStrategy: isCustomStrategy(localStorage.getItem('bitgetCustomStrategy')) ? localStorage.getItem('bitgetCustomStrategy') : '트랜드',
    enterSymbolAmount: parseInt(localStorage.getItem('bitgetEnterSymbolAmount') ?? '') || DEFAULT_ENTER_SYMBOL_AMOUNT,
    enterSymbolCount: parseInt(localStorage.getItem('bitgetEnterSymbolCount') ?? '') || DEFAULT_ENTER_SYMBOL_COUNT,
  };

  const [query, setQuery] = useQueryParams({
    leverage: withDefault(NumberParam, initialValues.leverage),
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), initialValues.enterStrategy as EnterStrategy),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), initialValues.customStrategy as CustomStrategy),
    enterSymbolAmount: withDefault(NumberParam, initialValues.enterSymbolAmount),
    enterSymbolCount: withDefault(NumberParam, initialValues.enterSymbolCount),
  });
  useEffect(() => {
    localStorage.setItem('bitgetLeverage', query.leverage.toString());
    localStorage.setItem('bitgetEnterStrategy', query.enterStrategy);
    localStorage.setItem('bitgetCustomStrategy', query.customStrategy);
    localStorage.setItem('bitgetEnterSymbolAmount', query.enterSymbolAmount.toString());
    localStorage.setItem('bitgetEnterSymbolCount', query.enterSymbolCount.toString());
  }, [query]);
  return {
    store: query,
    setStore: setQuery,
  };
};

export type BitgetStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useBitgetStateStore>;

export type ExchangeStateStore = BinanceStateStore | UpbitStateStore | BithumbStateStore | BitgetStateStore;
