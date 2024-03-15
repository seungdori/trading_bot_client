import { useQueryParam, ArrayParam, withDefault } from 'use-query-params';

export const useUpbitAvailableMarketsStore = () => {
  const [availableMarkets, setAvailableMarkets] = useQueryParam(
    'upbitSymbols',
    withDefault(ArrayParam, [] as string[], false),
  );
  return { availableMarkets, setAvailableMarkets };
};
