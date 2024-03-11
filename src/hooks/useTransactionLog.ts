import { useQuery } from '@tanstack/react-query';
import { getTransactionLog } from '@/components/api/desktopClient.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';

const TRANSACTION_LOG_FETCH_INTERVAL_MS = 100000;

export const useTransactionLog = () => {
  const { exchange } = useExchangeStore();

  return useQuery({
    enabled: !!exchange,
    queryKey: ['transactionLog', exchange],
    queryFn: () => getTransactionLog(exchange!),
    refetchInterval: TRANSACTION_LOG_FETCH_INTERVAL_MS,
  });
};
