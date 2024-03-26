import { useQuery } from '@tanstack/react-query';
import { getAiSearchProgress } from '@/components/api/desktopClient.ts';
import { Exchange } from '@/types/exchangeTypes.ts';
import { EnterStrategy } from '@/store/strategyStore.ts';

export const useAiSearchProgress = (exchange: Exchange, enterStrategy: EnterStrategy, fetchInterval?: number) => {
  return useQuery({
    queryKey: ['getAiSearchProgress', exchange, enterStrategy],
    queryFn: () => getAiSearchProgress(exchange, enterStrategy),
    refetchInterval: fetchInterval ?? 3000,
  });
};
