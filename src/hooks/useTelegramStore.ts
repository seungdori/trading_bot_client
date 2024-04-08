import { useLocalStorage } from '@/store/settingsStore.ts';
import { Exchange } from '@/types/exchangeTypes.ts';
import { useUpdateTelegramToken } from '@/hooks/useUpdateTelegramToken.ts';
import { useMutation } from '@tanstack/react-query';
import { updateTelegramId, updateTeleramToken } from '@/components/api/desktopClient.ts';
import { useUpdateTelegramId } from '@/hooks/useUpdateTelegramId.ts';

const TELEGRAN_ID_KEY = 'TELEGRAM_ID';

type TelegramStoreErrorHandlers = {
  onIdUpdateError?: (message: string) => void;
  onTokenUpdateError?: (message: string) => void;
};

export const useTelegramStore = (exchange: Exchange, errorHandlers?: TelegramStoreErrorHandlers) => {
  const settingsStore = useLocalStorage();
  const { TOKEN_KEY } = buildLocalStorageKey(exchange);
  const telegramId = settingsStore.get(TELEGRAN_ID_KEY) ?? '';
  const token = settingsStore.get(TOKEN_KEY) ?? '';
  const idMutation = useUpdateTelegramId();
  const tokenMutation = useUpdateTelegramToken(exchange);

  const updateId = (updated: string) => {
    settingsStore.set(TELEGRAN_ID_KEY, updated);
    idMutation.mutate(updated);
  };

  const updateToken = (updated: string) => {
    settingsStore.set(TOKEN_KEY, updated);
    tokenMutation.mutate({ exchange, token: updated });
  };

  if (idMutation.isError) {
    if (errorHandlers?.onIdUpdateError) {
      errorHandlers.onIdUpdateError(idMutation.error.message);
    }
  }

  if (tokenMutation.isError) {
    console.log('[TOKEN MUTATION ERROR]', tokenMutation.error);
    if (errorHandlers?.onTokenUpdateError) {
      errorHandlers.onTokenUpdateError(tokenMutation.error.message);
    }
  }

  return { telegramId, token, updateId, updateToken };
};

function buildLocalStorageKey(exchange: Exchange) {
  switch (exchange) {
    case 'binance':
      return {
        TOKEN_KEY: 'BINANCE_TELEGRAM_TOKEN',
      };
    case 'upbit':
      return {
        TOKEN_KEY: 'UPBIT_TELEGRAM_TOKEN',
      };
    case 'bithumb':
      return {
        TOKEN_KEY: 'BITHUMB_TELEGRAM_TOKEN',
      };
    case 'bitget':
      return {
        TOKEN_KEY: 'bitget_TELEGRAM_TOKEN',
      };
  }
}

async function initTelegramTokens(exchanges: ({ exchange: Exchange } & { token: string })[]) {
  const responsePromises = exchanges.map((request) => updateTeleramToken(request));
  try {
    const responses = await Promise.all(responsePromises);
    responses.forEach((response) => console.log(response));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export const useInitTelegramTokens = () => {
  const { token: binanceToken } = useTelegramStore('binance');
  const { token: bithumbToken } = useTelegramStore('bithumb');
  const { token: upbitToken } = useTelegramStore('upbit');
  const { token: bitgetToken } = useTelegramStore('bitget');

  return useMutation({
    mutationKey: ['initTelegramTokens', binanceToken, bithumbToken, upbitToken, bitgetToken],
    mutationFn: () =>
      initTelegramTokens([
        { exchange: 'binance', token: binanceToken },
        { exchange: 'bithumb', token: bithumbToken },
        { exchange: 'upbit', token: upbitToken },
        { exchange: 'bitget', token: bitgetToken },
      ]),
  });
};

export const useInitTelegramId = () => {
  const { telegramId } = useTelegramStore('binance'); // any exchange will do
  return useMutation({
    mutationKey: ['initTelegramId', telegramId],
    mutationFn: async () => updateTelegramId(telegramId),
  });
};
