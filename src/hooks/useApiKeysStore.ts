import { Exchange } from '@/types/exchangeTypes.ts';
import { useSettingsStore } from '@/store/settingsStore.ts';
import { ApiKeys } from '@/types/settingsTypes.ts';

export const useApiKeysStore = (exchange: Exchange) => {
  const settingsStore = useSettingsStore();
  const { API_KEY, SECRET } = buildLocalStorageKeys(exchange);
  const keys: ApiKeys = {
    apiKey: settingsStore.get(API_KEY) ?? '',
    secret: settingsStore.get(SECRET) ?? '',
  };

  const updateApiKeys = (updated: ApiKeys) => {
    settingsStore.set(API_KEY, updated.apiKey);
    settingsStore.set(SECRET, updated.secret);
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
