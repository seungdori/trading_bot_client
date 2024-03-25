import { useMutation } from '@tanstack/react-query';
import { clearBotErrorState } from '@/components/api/desktopClient.ts';
import { BotStateKeyArgs } from '@/types/backendTypes.ts';

export const useClearBotStateError = ({ exchange, enterStrategy, customStrategy }: BotStateKeyArgs) => {
  return useMutation({
    mutationKey: ['clearBotErrorState', exchange, enterStrategy, customStrategy],
    mutationFn: clearBotErrorState,
    onSuccess: (botState) => {
      console.log('[CLEAR BOT STATE ERROR SUCCESS]', botState);
    },
    onError: (error) => {
      console.error('[CLEAR BOT STATE ERROR ERROR]', error);
      throw error;
    },
  });
};
