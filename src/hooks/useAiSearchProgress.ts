import { useQuery } from '@tanstack/react-query';
import { getAiSearchProgress } from '@/components/api/desktopClient.ts';
import { Exchange } from '@/types/exchangeTypes.ts';
import { CustomStrategy, EnterStrategy } from '@/types/backendTypes.ts';

export const useAiSearchProgress = ({
  exchange,
  enterStrategy,
  customStrategy,
  fetchInterval,
}: {
  exchange: Exchange;
  enterStrategy: EnterStrategy;
  customStrategy: CustomStrategy;
  fetchInterval?: number;
}) => {
  return useQuery({
    queryKey: ['getAiSearchProgress', exchange, enterStrategy, customStrategy],
    queryFn: () => getAiSearchProgress(exchange, enterStrategy, customStrategy),
    refetchInterval: fetchInterval ?? 3000,
  });
};
