import { useQuery } from '@tanstack/react-query';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';
import { getWallet } from '@/components/api/exchangeClient.ts';

export const useWallet = ({ refetchInterval }: { refetchInterval: number } = { refetchInterval: 1000 }) => {
  const { exchange } = useStrategyStore();

  return useQuery({
    queryKey: ['wallet', exchange],
    queryFn: () => getWallet(exchange),
    refetchInterval: refetchInterval,
  });
};
