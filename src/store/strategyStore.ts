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



export function saveLeverage(exchangeName: string, leverage: number) {
  const leverageKey = `${exchangeName}Leverage`;
  localStorage.setItem(leverageKey, leverage.toString());
}

export function defaultLeverage(exchangeName: string): number {
  const leverageKey = `${exchangeName}Leverage`;
  const leverage = localStorage.getItem(leverageKey);

  if (leverage !== null) {
    return parseInt(leverage);
  } else {
    const defaultLeverageValue = DEFAULT_LEVERAGE;
    localStorage.setItem(leverageKey, defaultLeverageValue.toString());
    return defaultLeverageValue;
  }
}
export const useBinanceStateStore = () => {
  const exchangeName = 'binance';
  const initialValues = {
    leverage: parseInt(localStorage.getItem(`${exchangeName}Leverage`) ?? '') || defaultLeverage(exchangeName),
    enterStrategy: isEnterStrategy(localStorage.getItem(`${exchangeName}EnterStrategy`)) ? localStorage.getItem(`${exchangeName}EnterStrategy`) : 'long-short',
    customStrategy: isCustomStrategy(localStorage.getItem(`${exchangeName}CustomStrategy`)) ? localStorage.getItem(`${exchangeName}CustomStrategy`) : '그리드',
    enterSymbolAmount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolAmount`) ?? '') || DEFAULT_ENTER_SYMBOL_AMOUNT,
    enterSymbolCount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolCount`) ?? '') || DEFAULT_ENTER_SYMBOL_COUNT,
  };

  const [query, setQuery] = useQueryParams({
    leverage: withDefault(NumberParam, initialValues.leverage),
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), initialValues.enterStrategy as EnterStrategy),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), initialValues.customStrategy as CustomStrategy),
    enterSymbolAmount: withDefault(NumberParam, initialValues.enterSymbolAmount),
    enterSymbolCount: withDefault(NumberParam, initialValues.enterSymbolCount),
  });


  useEffect(() => {
    localStorage.setItem(`${exchangeName}Leverage`, query.leverage.toString());
    localStorage.setItem(`${exchangeName}EnterStrategy`, query.enterStrategy);
    localStorage.setItem(`${exchangeName}CustomStrategy`, query.customStrategy);
    localStorage.setItem(`${exchangeName}EnterSymbolAmount`, query.enterSymbolAmount.toString());
    localStorage.setItem(`${exchangeName}EnterSymbolCount`, query.enterSymbolCount.toString());
  }, [query]);

  return {
    store: query,
    setStore: setQuery,
  };
};

export type BinanceStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useBinanceStateStore>;


export const useUpbitStateStore = () => {
  const exchangeName = 'upbit';
  const initialValues = {
    leverage: parseInt(localStorage.getItem(`${exchangeName}Leverage`) ?? '') || defaultLeverage(exchangeName),
    enterStrategy: isEnterStrategy(localStorage.getItem(`${exchangeName}EnterStrategy`)) ? localStorage.getItem(`${exchangeName}EnterStrategy`) : 'long',
    customStrategy: isCustomStrategy(localStorage.getItem(`${exchangeName}CustomStrategy`)) ? localStorage.getItem(`${exchangeName}CustomStrategy`) : '그리드',
    enterSymbolAmount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolAmount`) ?? '') || DEFAULT_ENTER_SYMBOL_AMOUNT,
    enterSymbolCount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolCount`) ?? '') || DEFAULT_ENTER_SYMBOL_COUNT,
  };

  const [query, setQuery] = useQueryParams({
    leverage: withDefault(NumberParam, initialValues.leverage),
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), initialValues.enterStrategy as EnterStrategy),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), initialValues.customStrategy as CustomStrategy),
    enterSymbolAmount: withDefault(NumberParam, initialValues.enterSymbolAmount),
    enterSymbolCount: withDefault(NumberParam, initialValues.enterSymbolCount),
  });

  useEffect(() => {
    localStorage.setItem(`${exchangeName}Leverage`, query.leverage.toString());
    localStorage.setItem(`${exchangeName}EnterStrategy`, query.enterStrategy);
    localStorage.setItem(`${exchangeName}CustomStrategy`, query.customStrategy);
    localStorage.setItem(`${exchangeName}EnterSymbolAmount`, query.enterSymbolAmount.toString());
    localStorage.setItem(`${exchangeName}EnterSymbolCount`, query.enterSymbolCount.toString());
  }, [query]);

  return {
    store: query,
    setStore: setQuery,
  };
};

export type UpbitStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useUpbitStateStore>;

export const useBithumbStateStore = () => {
  const exchangeName = 'bithumb';
  const initialValues = {
    enterStrategy: isEnterStrategy(localStorage.getItem(`${exchangeName}EnterStrategy`)) ? localStorage.getItem(`${exchangeName}EnterStrategy`) : 'long',
    customStrategy: isCustomStrategy(localStorage.getItem(`${exchangeName}CustomStrategy`)) ? localStorage.getItem(`${exchangeName}CustomStrategy`) : '그리드',
    enterSymbolAmount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolAmount`) ?? '') || DEFAULT_ENTER_SYMBOL_AMOUNT,
    enterSymbolCount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolCount`) ?? '') || DEFAULT_ENTER_SYMBOL_COUNT,
  };
  const [query, setQuery] = useQueryParams({
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), initialValues.enterStrategy as EnterStrategy),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), initialValues.customStrategy as CustomStrategy),
    enterSymbolAmount: withDefault(NumberParam, initialValues.enterSymbolAmount),
    enterSymbolCount: withDefault(NumberParam, initialValues.enterSymbolCount),
  });
  useEffect(() => {
    localStorage.setItem(`${exchangeName}EnterStrategy`, query.enterStrategy);
    localStorage.setItem(`${exchangeName}CustomStrategy`, query.customStrategy);
    localStorage.setItem(`${exchangeName}EnterSymbolAmount`, query.enterSymbolAmount.toString());
    localStorage.setItem(`${exchangeName}EnterSymbolCount`, query.enterSymbolCount.toString());
  }, [query]);

  return {
    store: query,
    setStore: setQuery,
  };
};


export type BithumbStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useBithumbStateStore>;

export const useBitgetStateStore = () => {
  const exchangeName = 'bitget';

  const initialValues = {
    leverage: parseInt(localStorage.getItem(`${exchangeName}Leverage`) ?? '') || defaultLeverage(exchangeName),
    enterStrategy: isEnterStrategy(localStorage.getItem(`${exchangeName}EnterStrategy`)) ? localStorage.getItem(`${exchangeName}EnterStrategy`) : 'long',
    customStrategy: isCustomStrategy(localStorage.getItem(`${exchangeName}CustomStrategy`)) ? localStorage.getItem(`${exchangeName}CustomStrategy`) : '그리드',
    enterSymbolAmount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolAmount`) ?? '') || DEFAULT_ENTER_SYMBOL_AMOUNT,
    enterSymbolCount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolCount`) ?? '') || DEFAULT_ENTER_SYMBOL_COUNT,
  };

  const [query, setQuery] = useQueryParams({
    leverage: withDefault(NumberParam, initialValues.leverage),
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), initialValues.enterStrategy as EnterStrategy),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), initialValues.customStrategy as CustomStrategy),
    enterSymbolAmount: withDefault(NumberParam, initialValues.enterSymbolAmount),
    enterSymbolCount: withDefault(NumberParam, initialValues.enterSymbolCount),
  });

  useEffect(() => {
    localStorage.setItem(`${exchangeName}Leverage`, query.leverage.toString());
    localStorage.setItem(`${exchangeName}EnterStrategy`, query.enterStrategy);
    localStorage.setItem(`${exchangeName}CustomStrategy`, query.customStrategy);
    localStorage.setItem(`${exchangeName}EnterSymbolAmount`, query.enterSymbolAmount.toString());
    localStorage.setItem(`${exchangeName}EnterSymbolCount`, query.enterSymbolCount.toString());
  }, [query]);

  return {
    store: query,
    setStore: setQuery,
  };
};

export type BitgetStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useBitgetStateStore>;


export const useOkxStateStore = () => {
  const exchangeName = 'okx';
  

  const initialValues = {
    leverage: parseInt(localStorage.getItem(`${exchangeName}Leverage`) ?? defaultLeverage(exchangeName).toString()),
    enterStrategy: isEnterStrategy(localStorage.getItem(`${exchangeName}EnterStrategy`)) ? localStorage.getItem(`${exchangeName}EnterStrategy`) : 'long-short',
    customStrategy: isCustomStrategy(localStorage.getItem(`${exchangeName}CustomStrategy`)) ? localStorage.getItem(`${exchangeName}CustomStrategy`) : '그리드',
    enterSymbolAmount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolAmount`) ?? '') || DEFAULT_ENTER_SYMBOL_AMOUNT,
    enterSymbolCount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolCount`) ?? '') || DEFAULT_ENTER_SYMBOL_COUNT,
  };
  console.log('Initial values for OKX:', initialValues);
  const [query, setQuery] = useQueryParams({
    leverage: withDefault(NumberParam, initialValues.leverage),
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), initialValues.enterStrategy as EnterStrategy),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), initialValues.customStrategy as CustomStrategy),
    enterSymbolAmount: withDefault(NumberParam, initialValues.enterSymbolAmount),
    enterSymbolCount: withDefault(NumberParam, initialValues.enterSymbolCount),
  });

  useEffect(() => {
    localStorage.setItem(`${exchangeName}Leverage`, query.leverage.toString());
    localStorage.setItem(`${exchangeName}EnterStrategy`, query.enterStrategy);
    localStorage.setItem(`${exchangeName}CustomStrategy`, query.customStrategy);
    localStorage.setItem(`${exchangeName}EnterSymbolAmount`, query.enterSymbolAmount.toString());
    localStorage.setItem(`${exchangeName}EnterSymbolCount`, query.enterSymbolCount.toString());
  }, [query]);

  return {
    store: query,
    setStore: setQuery,
  };
};

export type OkxStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useOkxStateStore>;

export const useOkxSpotStateStore = () => {
  const exchangeName = 'okx_spot';
  

  const initialValues = {
    enterStrategy: isEnterStrategy(localStorage.getItem(`${exchangeName}EnterStrategy`)) ? localStorage.getItem(`${exchangeName}EnterStrategy`) : 'long',
    customStrategy: isCustomStrategy(localStorage.getItem(`${exchangeName}CustomStrategy`)) ? localStorage.getItem(`${exchangeName}CustomStrategy`) : '그리드',
    enterSymbolAmount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolAmount`) ?? '') || DEFAULT_ENTER_SYMBOL_AMOUNT,
    enterSymbolCount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolCount`) ?? '') || DEFAULT_ENTER_SYMBOL_COUNT,
  };
  console.log('Initial values for OKX_SPOT:', initialValues);
  const [query, setQuery] = useQueryParams({
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), initialValues.enterStrategy as EnterStrategy),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), initialValues.customStrategy as CustomStrategy),
    enterSymbolAmount: withDefault(NumberParam, initialValues.enterSymbolAmount),
    enterSymbolCount: withDefault(NumberParam, initialValues.enterSymbolCount),
  });

  useEffect(() => {
    localStorage.setItem(`${exchangeName}EnterStrategy`, query.enterStrategy);
    localStorage.setItem(`${exchangeName}CustomStrategy`, query.customStrategy);
    localStorage.setItem(`${exchangeName}EnterSymbolAmount`, query.enterSymbolAmount.toString());
    localStorage.setItem(`${exchangeName}EnterSymbolCount`, query.enterSymbolCount.toString());
  }, [query]);

  return {
    store: query,
    setStore: setQuery,
  };
};

export type OkxSpotStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useOkxSpotStateStore>;


export const useBitgetSpotStateStore = () => {
  const exchangeName = 'bitget_spot';
  const initialValues = {
    leverage: parseInt(localStorage.getItem(`${exchangeName}Leverage`) ?? '') || defaultLeverage(exchangeName),
    enterStrategy: isEnterStrategy(localStorage.getItem(`${exchangeName}EnterStrategy`)) ? localStorage.getItem(`${exchangeName}EnterStrategy`) : 'long',
    customStrategy: isCustomStrategy(localStorage.getItem(`${exchangeName}CustomStrategy`)) ? localStorage.getItem(`${exchangeName}CustomStrategy`) : '그리드',
    enterSymbolAmount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolAmount`) ?? '') || DEFAULT_ENTER_SYMBOL_AMOUNT,
    enterSymbolCount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolCount`) ?? '') || DEFAULT_ENTER_SYMBOL_COUNT,
  };

  const [query, setQuery] = useQueryParams({
    leverage: withDefault(NumberParam, initialValues.leverage),
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), initialValues.enterStrategy as EnterStrategy),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), initialValues.customStrategy as CustomStrategy),
    enterSymbolAmount: withDefault(NumberParam, initialValues.enterSymbolAmount),
    enterSymbolCount: withDefault(NumberParam, initialValues.enterSymbolCount),
  });

  useEffect(() => {
    localStorage.setItem(`${exchangeName}Leverage`, query.leverage.toString());
    localStorage.setItem(`${exchangeName}EnterStrategy`, query.enterStrategy);
    localStorage.setItem(`${exchangeName}CustomStrategy`, query.customStrategy);
    localStorage.setItem(`${exchangeName}EnterSymbolAmount`, query.enterSymbolAmount.toString());
    localStorage.setItem(`${exchangeName}EnterSymbolCount`, query.enterSymbolCount.toString());
  }, [query]);

  return {
    store: query,
    setStore: setQuery,
  };
};

export type BitgetSpotStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useBinanceStateStore>;


export const useBinancespotStateStore = () => {
  const exchangeName = 'binance_spot';
  const initialValues = {
    leverage: parseInt(localStorage.getItem(`${exchangeName}Leverage`) ?? '') || defaultLeverage(exchangeName),
    enterStrategy: isEnterStrategy(localStorage.getItem(`${exchangeName}EnterStrategy`)) ? localStorage.getItem(`${exchangeName}EnterStrategy`) : 'long',
    customStrategy: isCustomStrategy(localStorage.getItem(`${exchangeName}CustomStrategy`)) ? localStorage.getItem(`${exchangeName}CustomStrategy`) : '그리드',
    enterSymbolAmount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolAmount`) ?? '') || DEFAULT_ENTER_SYMBOL_AMOUNT,
    enterSymbolCount: parseInt(localStorage.getItem(`${exchangeName}EnterSymbolCount`) ?? '') || DEFAULT_ENTER_SYMBOL_COUNT,
  };

  const [query, setQuery] = useQueryParams({
    leverage: withDefault(NumberParam, initialValues.leverage),
    enterStrategy: withDefault(createEnumParam<EnterStrategy>([...EnterStrategist]), initialValues.enterStrategy as EnterStrategy),
    customStrategy: withDefault(createEnumParam<CustomStrategy>([...CustomStrategist]), initialValues.customStrategy as CustomStrategy),
    enterSymbolAmount: withDefault(NumberParam, initialValues.enterSymbolAmount),
    enterSymbolCount: withDefault(NumberParam, initialValues.enterSymbolCount),
  });

  useEffect(() => {
    localStorage.setItem(`${exchangeName}Leverage`, query.leverage.toString());
    localStorage.setItem(`${exchangeName}EnterStrategy`, query.enterStrategy);
    localStorage.setItem(`${exchangeName}CustomStrategy`, query.customStrategy);
    localStorage.setItem(`${exchangeName}EnterSymbolAmount`, query.enterSymbolAmount.toString());
    localStorage.setItem(`${exchangeName}EnterSymbolCount`, query.enterSymbolCount.toString());
  }, [query]);

  return {
    store: query,
    setStore: setQuery,
  };
};

export type BinanceSpotStateStore = Omit<ReturnType<typeof useExchangeStore>, 'setExchange'> &
  ReturnType<typeof useBinanceStateStore>;


export type ExchangeStateStore = BinanceStateStore | UpbitStateStore | BithumbStateStore | BitgetStateStore | OkxStateStore | OkxSpotStateStore | BinanceStateStore | BitgetStateStore;
