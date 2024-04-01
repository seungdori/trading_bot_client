import { useQuery } from '@tanstack/react-query';
import { Exchange } from '@/types/exchangeTypes.ts';
import { getWinRates } from '@/components/api/desktopClient.ts';
import { CustomStrategy, EnterStrategy } from '@/types/backendTypes.ts';

export const useWinRates = ({
  exchange,
  enterStrategy,
  customStrategy,
}: {
  exchange: Exchange;
  enterStrategy: EnterStrategy;
  customStrategy: CustomStrategy;
}) => {
  return useQuery({
    queryKey: ['winRates', exchange, enterStrategy, customStrategy],
    queryFn: () => getWinRates({ exchange, enterStrategy, customStrategy }),
  });
};
