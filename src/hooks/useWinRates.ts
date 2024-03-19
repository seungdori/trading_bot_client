import { useQuery } from '@tanstack/react-query';
import { Exchange } from '@/types/exchangeTypes.ts';
import { getWinRates } from '@/components/api/desktopClient.ts';

export const useWinRates = (exchange: Exchange) => {
  return useQuery({
    queryKey: ['winRates', exchange],
    queryFn: () => getWinRates(exchange),
  });
};
