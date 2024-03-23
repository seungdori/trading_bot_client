import { useQuery } from '@tanstack/react-query';
import { getWalletFromBackend } from '@/components/api/exchangeClient.ts';
import { Exchange } from '@/types/exchangeTypes.ts';

export const useWallet = ({ exchange, refetchInterval }: { exchange: Exchange; refetchInterval?: number }) => {
  return useQuery({
    enabled: !!exchange,
    queryKey: ['wallet', exchange],
    queryFn: () => getWalletFromBackend(exchange),
    refetchInterval: refetchInterval ?? 1000,
  });
};

// Todo: remove
// export const useWallet = ({ exchange, refetchInterval }: { exchange: Exchange; refetchInterval?: number }) => {
//   const { keys } = useApiKeysStore(exchange);
//
//   return useQuery({
//     enabled: !!exchange,
//     queryKey: ['wallet', exchange],
//     queryFn: () => getWallet(exchange, { apiKey: keys.apiKey, secret: keys.secret }),
//     refetchInterval: refetchInterval ?? 1000,
//   });
// };
