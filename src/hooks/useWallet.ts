import { useQuery } from '@tanstack/react-query';
import { getWallet } from '@/components/api/exchangeClient.ts';
import { useApiKeysStore } from '@/hooks/useApiKeysStore.ts';
import { Exchange } from '@/types/exchangeTypes.ts';

export const useWallet = ({ exchange, refetchInterval }: { exchange: Exchange; refetchInterval?: number }) => {
  const { keys } = useApiKeysStore(exchange);

  return useQuery({
    enabled: !!exchange,
    queryKey: ['wallet', exchange],
    queryFn: () => getWallet(exchange, { apiKey: keys.apiKey, secret: keys.secret }),
    refetchInterval: refetchInterval ?? 1000,
  });
};
