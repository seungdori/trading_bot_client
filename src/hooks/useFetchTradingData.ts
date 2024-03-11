import { Wallet } from '@/types/exchangeTypes.ts';
import { useQuery } from '@tanstack/react-query';
import { fetchUpbitTradingData } from '@/components/api/desktopClient.ts';
import { z } from 'zod';
import { TradingDataResponseSchema } from '@/schemas/backendSchema.ts';

async function fetchTradingData({
  exchange,
  symbols,
}: {
  exchange: Wallet['exchange'];
  symbols: string[];
}): Promise<z.infer<typeof TradingDataResponseSchema>[]> {
  switch (exchange) {
    case 'upbit':
      return fetchUpbitTradingData(exchange, symbols);
    case 'binance':
    // Todo: Impl
    // return fetchBinaceTradingData(exchange, symbols);
    case 'bithumb':
    // Todo: Impl
    default:
      return [];
  }
}

export const useFetchTradingData = ({ exchange, symbols }: { exchange: Wallet['exchange']; symbols: string[] }) => {
  return useQuery({
    queryKey: ['upbitTradingData', exchange, symbols],
    queryFn: () => fetchTradingData({ exchange, symbols }),
  });
};
