import { Exchange } from '@/types/exchangeTypes.ts';
import { useLocalStorage } from '@/store/settingsStore.ts';

/**
 * @description 거래소별 거래내역을 저장하는 훅.
 * @param exchange 거래소 이름.
 * @returns 거래내역을 가져오는 함수와 거래내역을 추가하는 함수.
 * @example
 * const { getTransactionLog, appendTransactionLog } = useTransactionLogStore('upbit');
 * const logs = getTransactionLog();
 * appendTransactionLog('거래내역 추가');
 */
export const useTransactionLogStore = (exchange: Exchange) => {
  const { get, set } = useLocalStorage();
  const key = `${exchange}-transaction-log`;
  const maxItemCount = 10;

  const getTransactionLogs = (): string[] => {
    const logs = get(key);
    return logs ? [...JSON.parse(logs)] : [];
  };

  const append = (log: string) => {
    const logs = getTransactionLogs();
    logs.push(log);
    if (logs.length > maxItemCount) {
      logs.shift();
    }
    set(key, JSON.stringify(logs));
  };

  return { logs: getTransactionLogs(), append };
};
