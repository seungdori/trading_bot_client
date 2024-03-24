import { useQuery } from '@tanstack/react-query';
import { getWalletFromBackend } from '@/components/api/exchangeClient.ts';
import { Exchange } from '@/types/exchangeTypes.ts';

export const useWallet = ({ exchange, refetchInterval }: { exchange: Exchange; refetchInterval?: number }) => {
  return useQuery({
    enabled: !!exchange,
    queryKey: ['wallet', exchange],
    queryFn: () => getWalletFromBackend(exchange),
    refetchInterval: refetchInterval ?? 2000,
  });
};
