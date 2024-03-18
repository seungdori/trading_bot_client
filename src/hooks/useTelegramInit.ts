import { useInitTelegramId, useInitTelegramTokens } from '@/hooks/useTelegramStore.ts';

export const useTelegramInit = () => {
  const initIdMutation = useInitTelegramId();
  const initTokensMutation = useInitTelegramTokens();

  const mutate = () => {
    initIdMutation.mutate();
    initTokensMutation.mutate();
  };

  return { mutate };
};
