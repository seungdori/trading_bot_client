import { ArrayParam, useQueryParam, withDefault, QueryParamConfig } from 'use-query-params';
import { Exchange } from '@/types/exchangeTypes.ts';

const SelectCoinsParam = withDefault(ArrayParam, [], false) as QueryParamConfig<string[]>;

export const useSelectedCoinStore = (exchange: Exchange) => {
  const [selectedCoins, setSelectedCoins] = useQueryParam(`${exchange}-selected-coins`, SelectCoinsParam, {});
  return { selectedCoins, setSelectedCoins };
};
