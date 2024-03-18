import { Exchange } from '@/types/exchangeTypes.ts';
import { useLocalStorage } from '@/store/settingsStore.ts';
import { ExchangeApiKeys } from '@/types/settingsTypes.ts';
import { useMutation } from '@tanstack/react-query';
import { updateExchangeApiKeys } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';

const useUpdateExchangeApiKey = (exchange: Exchange) => {
  return useMutation({
    mutationKey: ['updateExchangeApiKeys', exchange],
    mutationFn: updateExchangeApiKeys,
    onSuccess: (responseDto) => {
      if (responseDto.success) {
        toast({
          title: responseDto.message,
        });
      } else {
        toast({
          title: responseDto.message,
        });
      }
    },
    onError: (error) => {
      throw new Error(error.message);
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

export const useApiKeysStore = (exchange: Exchange) => {
  const settingsStore = useLocalStorage();
  const { API_KEY, SECRET } = buildLocalStorageKeys(exchange);
  const keys: ExchangeApiKeys = {
    apiKey: settingsStore.get(API_KEY) ?? '',
    secret: settingsStore.get(SECRET) ?? '',
  };
  const mutation = useUpdateExchangeApiKey(exchange);

  const updateApiKeys = (updated: ExchangeApiKeys) => {
    settingsStore.set(API_KEY, updated.apiKey);
    settingsStore.set(SECRET, updated.secret);

    mutation.mutate({
      exchange,
      apiKey: updated.apiKey,
      secret: updated.secret,
    });
  };

  return { keys, updateApiKeys };
};

function buildLocalStorageKeys(exchange: Exchange) {
  switch (exchange) {
    case 'binance':
      return {
        API_KEY: 'BINANCE_API_KEY',
        SECRET: 'BINANCE_SECRET',
      };
    case 'bithumb':
      return {
        API_KEY: 'BITHUMB_API_KEY',
        SECRET: 'BITHUMB_SECRET',
      };
    case 'upbit':
      return {
        API_KEY: 'UPBIT_API_KEY',
        SECRET: 'UPBIT_SECRET',
      };
  }
}

export const useInitExchangeApiKeys = () => {
  const { keys: binanceKeys } = useApiKeysStore('binance');
  const { keys: bithumbKeys } = useApiKeysStore('bithumb');
  const { keys: upbitKeys } = useApiKeysStore('upbit');

  return useMutation({
    mutationKey: ['initExchangeApiKeys', binanceKeys, bithumbKeys, upbitKeys],
    mutationFn: () =>
      initExchangeApiKeys([
        { exchange: 'binance', ...binanceKeys },
        { exchange: 'bithumb', ...bithumbKeys },
        { exchange: 'upbit', ...upbitKeys },
      ]),
  });
};
