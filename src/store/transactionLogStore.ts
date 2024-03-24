import { Exchange } from '@/types/exchangeTypes.ts';
import { useLocalStorage } from '@/store/settingsStore.ts';
import { z } from 'zod';

/**
 * @description 거래소별 거래내역을 저장하는 훅.
 * @param exchange 거래소 이름.
 * @returns 거래내역을 가져오는 함수와 거래내역을 추가하는 함수.
 * @example
 * const { logs, append, clear } = useTadingLogStore('upbit');
 * logs.join('\n');
 * append('거래내역 추가');
 * clear();
 */
export const useTadingLogStore = (exchange: Exchange) => {
  const { get, set } = useLocalStorage();
  console.log(exchange);
  // const key = `${exchange}-transaction-log`; // Todo: 거래소별 거래내역을 저장할 수 있도록 요구사항 변경시 사용.
  const key = `transaction-log`;
  const maxItemCount = 100;

  const getTransactionLogs = (): string[] => {
    const logs = get(key);
    return logs ? [...JSON.parse(logs)] : [];
  };

  const append = (log: string | string[]) => {
    const prevLogs = getTransactionLogs();
    const isArray = z.string().array().safeParse(log);
    if (isArray.success) {
      isArray.data.forEach((item) => {
        prevLogs.push(item);
        if (prevLogs.length > maxItemCount) {
          prevLogs.shift();
        }
      });
    } else {
      prevLogs.push(log as string);
      if (prevLogs.length > maxItemCount) {
        prevLogs.shift();
      }
    }

    set(key, JSON.stringify(prevLogs));
  };

  const clear = () => {
    set(key, JSON.stringify([]));
  };

  return { logs: getTransactionLogs(), append, clear };
};
