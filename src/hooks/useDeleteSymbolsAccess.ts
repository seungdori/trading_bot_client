import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteSymbolAccessList } from '@/components/api/desktopClient.ts';
import { SymbolAccessList } from '@/types/backendTypes.ts';
import { buildFetchSymbolsAccessQueryKey } from '@/hooks/useFetchSymbolsAccess.ts';

export const useDeleteSymbolsAccess = ({ type }: Pick<SymbolAccessList, 'type'>) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ['deleteSymbolAccessList', type],
    mutationFn: deleteSymbolAccessList,
    onSuccess: () => {
      return queryClient.resetQueries({ queryKey: buildFetchSymbolsAccessQueryKey(type) });
    },
  });
};
