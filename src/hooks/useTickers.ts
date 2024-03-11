import { TickerRequest, TickersWithKey } from '@/types/exchangeTypes.ts';
import { useQuery } from '@tanstack/react-query';
import { getUpbitTickers } from '@/components/api/upbitClient.ts';
import { getBinanceTickers } from '@/components/api/binanceClient.ts';
import { getBithumbTickers } from '@/components/api/bithumbClient.ts';

export async function getTickers({ wallet, symbols }: TickerRequest): Promise<TickersWithKey> {
  switch (wallet?.exchange) {
    case 'upbit':
      return getUpbitTickers({ symbols });
    case 'binance':
      return getBinanceTickers({ symbols });
    case 'bithumb':
      return getBithumbTickers({ symbols });
    default:
      throw new Error('Invalid exchange');
  }
}

export const useTickers = ({ wallet, symbols }: TickerRequest) => {
  return useQuery({
    queryKey: ['tickers', wallet?.exchange, symbols],
    queryFn: () => getTickers({ wallet, symbols }),
    refetchInterval: 1000,
  });
};
