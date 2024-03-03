import { Upbit } from '@/types/exchangeTypes.ts';
import { useQuery } from '@tanstack/react-query';
import { fetchUpbitTradingData } from '@/components/api/desktopClient.ts';

export const useFetchUpbitTradingData = (exchange: Upbit, symbols: string[]) => {
  return useQuery({
    queryKey: ['upbitTradingData', exchange, symbols],
    queryFn: () => fetchUpbitTradingData(exchange, symbols),
  });
};
