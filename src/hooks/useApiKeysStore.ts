import { Exchange } from '@/types/exchangeTypes.ts';
import { useLocalStorage } from '@/store/settingsStore.ts';
import { ExchangeApiKeys } from '@/types/settingsTypes.ts';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateExchangeApiKeys } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { buildBackendErrorMessage } from '@/helper/error.ts';

const useUpdateExchangeApiKey = (exchange: Exchange) => {
  const client = useQueryClient();

  return useMutation({
    mutationKey: ['updateExchangeApiKeys', exchange],
    mutationFn: updateExchangeApiKeys,
    onSuccess: (responseDto) => {
      if (responseDto.success) {
        toast({
          title: responseDto.message,
        });
      } else {
        const errorMessage = buildBackendErrorMessage(responseDto);
        throw new Error(errorMessage);
      }
    },
    onError: (error: Error) => {
      console.error('[UPDATE EXCHANGE API KEYS ERROR]', error.message);
      throw new Error(error.message);
    },
    onSettled: () => {
      client.resetQueries({ queryKey: ['positions', exchange] });
      client.resetQueries({ queryKey: ['wallet', exchange] });
      client.resetQueries({ queryKey: ['getAiSearchProgress', exchange] });
      client.resetQueries({ queryKey: ['fetchTradingData', exchange] });
      // client.resetQueries({ queryKey: ['transactionLog', exchange] }); // Todo: Impl
    },
  });
};

async function initExchangeApiKeys(exchanges: ({ exchange: Exchange } & ExchangeApiKeys)[]) {
  const responsePromises = exchanges.map((request) => updateExchangeApiKeys(request));
  try {
    const responses = await Promise.all(responsePromises);
    responses.forEach((response) => console.log(response));
    return true;
  } catch (e) {
    console.error(e);
    return false;
  }
}

export const useApiKeysStore = (exchange: Exchange, onError?: (message: string) => void) => {
  const settingsStore = useLocalStorage();
  const { API_KEY, SECRET, PASSWORD } = buildLocalStorageKeys(exchange);
  const keys: ExchangeApiKeys = {
    apiKey: settingsStore.get(API_KEY) ?? '',
    secret: settingsStore.get(SECRET) ?? '',
    password: settingsStore.get(PASSWORD) ?? '',
  };
  const mutation = useUpdateExchangeApiKey(exchange);

  const updateApiKeys = (updated: ExchangeApiKeys) => {
    settingsStore.set(API_KEY, updated.apiKey);
    settingsStore.set(SECRET, updated.secret);
    settingsStore.set(PASSWORD, updated.password ?? '');

    mutation.mutate({
      exchange,
      apiKey: updated.apiKey,
      secret: updated.secret,
      password: updated.password,
    });
  };

  if (mutation.isError) {
    if (onError) {
      onError(mutation.error.message);
    }
  }

  return { keys, updateApiKeys };
};

function buildLocalStorageKeys(exchange: Exchange) {
  switch (exchange) {
    case 'binance':
      return {
        API_KEY: 'BINANCE_API_KEY',
        SECRET: 'BINANCE_SECRET',
        PASSWORD: 'BINANCE_PASSWORD',
      };
    case 'bithumb':
      return {
        API_KEY: 'BITHUMB_API_KEY',
        SECRET: 'BITHUMB_SECRET',
        PASSWORD: 'BITHUMB_PASSWORD',
      };
    case 'upbit':
      return {
        API_KEY: 'UPBIT_API_KEY',
        SECRET: 'UPBIT_SECRET',
        PASSWORD: 'UPBIT_PASSWORD',
      };
    case 'bitget':
      return {
        API_KEY: 'bitget_API_KEY',
        SECRET: 'bitget_SECRET',
        PASSWORD: 'bitget_PASSWORD',
      };
    case 'okx':
      return {
        API_KEY: 'okx_API_KEY',
        SECRET: 'okx_SECRET',
        PASSWORD: 'okx_PASSWORD',
      };
  }
}

export const useInitExchangeApiKeys = () => {
  const { keys: binanceKeys } = useApiKeysStore('binance');
  const { keys: bithumbKeys } = useApiKeysStore('bithumb');
  const { keys: upbitKeys } = useApiKeysStore('upbit');
  const { keys: bitgetKeys } = useApiKeysStore('bitget');
  const { keys: okxKeys } = useApiKeysStore('okx');

  return useMutation({
    mutationKey: ['initExchangeApiKeys', binanceKeys, bithumbKeys, upbitKeys, bitgetKeys, okxKeys],
    mutationFn: () =>
      initExchangeApiKeys([
        { exchange: 'binance', ...binanceKeys },
        { exchange: 'bithumb', ...bithumbKeys },
        { exchange: 'upbit', ...upbitKeys },
        { exchange: 'bitget', ...bitgetKeys },
        { exchange: 'okx', ...okxKeys },
      ]),
  });
};
