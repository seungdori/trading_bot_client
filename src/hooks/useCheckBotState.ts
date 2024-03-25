import { Exchange } from '@/types/exchangeTypes.ts';
import { CustomStrategy, EnterStrategy } from '@/store/strategyStore.ts';
import { useQuery } from '@tanstack/react-query';
import { checkTradingBotState } from '@/components/api/desktopClient.ts';

const BOT_STATE_FETCH_INTERVAL = 5000;

export const useCheckBotState = ({
  exchange,
  enterStrategy,
  customStrategy,
}: {
  exchange: Exchange;
  enterStrategy: EnterStrategy;
  customStrategy: CustomStrategy;
}) => {
  return useQuery({
    queryKey: [exchange, enterStrategy, customStrategy],
    queryFn: async () => checkTradingBotState({ exchange, enterStrategy, customStrategy }),
    retryDelay: BOT_STATE_FETCH_INTERVAL,
  });
};
