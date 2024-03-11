import { useQuery } from '@tanstack/react-query';
import { getWallet } from '@/components/api/exchangeClient.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';

export const useWallet = ({ refetchInterval }: { refetchInterval: number } = { refetchInterval: 1000 }) => {
  const { exchange } = useExchangeStore();

  return useQuery({
    enabled: !!exchange,
    queryKey: ['wallet', exchange],
    queryFn: () => getWallet(exchange),
    refetchInterval: refetchInterval,
  });
};
