import { useQuery } from '@tanstack/react-query';
import { getWallet } from '@/components/api/exchangeClient.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';
import { useApiKeysStore } from '@/hooks/useApiKeysStore.ts';

export const useWallet = ({ refetchInterval }: { refetchInterval: number } = { refetchInterval: 1000 }) => {
  const { exchange } = useExchangeStore();
  const { keys } = useApiKeysStore(exchange);

  return useQuery({
    enabled: !!exchange,
    queryKey: ['wallet', exchange],
    queryFn: () => getWallet(exchange, { apiKey: keys.apiKey, secret: keys.secret }),
    refetchInterval: refetchInterval,
  });
};
