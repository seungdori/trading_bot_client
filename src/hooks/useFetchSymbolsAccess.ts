import { useQuery } from '@tanstack/react-query';
import { getSymbolAccessList } from '@/components/api/desktopClient.ts';
import { SymbolAccessList } from '@/types/backendTypes.ts';

export const buildFetchSymbolsAccessQueryKey = (type: string) => ['FETCH_SYMBOLS_ACCESS_QUERY_KEY', type];

export const useFetchSymbolsAccess = ({ type }: Pick<SymbolAccessList, 'type'>) => {
  return useQuery({
    queryKey: buildFetchSymbolsAccessQueryKey(type),
    queryFn: () => getSymbolAccessList({ type }),
  });
};
