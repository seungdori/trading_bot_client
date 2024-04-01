import { ArrayParam, useQueryParam, withDefault, QueryParamConfig, StringParam } from 'use-query-params';
import { Exchange } from '@/types/exchangeTypes.ts';
import { CustomStrategy, EnterStrategy } from '@/types/backendTypes.ts';

const SelectCoinsParam = withDefault(ArrayParam, [], false) as QueryParamConfig<string[]>;

export const useSelectedCoinsStore = (exchange: Exchange, componentId?: string) => {
  const key = componentId ? `${exchange}-selected-coins-${componentId}` : `${exchange}-selected-coins`;
  const [selectedCoins, setSelectedCoins] = useQueryParam(key, SelectCoinsParam, {});
  return { selectedCoins, setSelectedCoins };
};

export const useSelectedCoinStore = ({
  exchange,
  customStrategy,
  enterStrategy,
  componentId,
}: {
  exchange: Exchange;
  customStrategy: CustomStrategy;
  enterStrategy: EnterStrategy;
  componentId?: string;
}) => {
  const key = componentId
    ? `${exchange}-${customStrategy}-${enterStrategy}-selected-coin-${componentId}`
    : `${exchange}-${customStrategy}-${enterStrategy}-selected-coin`;
  const [selectedCoin, setSelectedCoin] = useQueryParam(key, StringParam);
  return { selectedCoin, setSelectedCoin };
};
