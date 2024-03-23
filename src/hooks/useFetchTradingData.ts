import { Exchange } from '@/types/exchangeTypes.ts';
import { useQuery } from '@tanstack/react-query';
import { fetchTradingData } from '@/components/api/desktopClient.ts';

export const useFetchTradingData = ({ exchange, symbols }: { exchange: Exchange; symbols: string[] }) => {
  return useQuery({
    queryKey: ['fetchTradingData', exchange, symbols],
    queryFn: () => fetchTradingData({ exchange, symbols }),
  });
};
