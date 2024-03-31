import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addSymbolAccessList } from '@/components/api/desktopClient.ts';
import { SymbolAccessList } from '@/types/backendTypes.ts';
import { buildFetchSymbolsAccessQueryKey } from '@/hooks/useFetchSymbolsAccess.ts';

export const useAddSymbolsAccess = ({ type }: Pick<SymbolAccessList, 'type'>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['updateSymbolsAccess', type],
    mutationFn: addSymbolAccessList,
    onSuccess: () => {
      return queryClient.resetQueries({ queryKey: buildFetchSymbolsAccessQueryKey(type) });
    },
  });
};
