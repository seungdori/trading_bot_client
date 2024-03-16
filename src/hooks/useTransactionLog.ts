import { useQuery } from '@tanstack/react-query';
import { getTransactionLogs } from '@/components/api/desktopClient.ts';
import { Exchange } from '@/types/exchangeTypes.ts';

const TRANSACTION_LOG_FETCH_INTERVAL_MS = 5000;

export const useTransactionLog = (exchange: Exchange) => {
  return useQuery({
    queryKey: ['transactionLog', exchange],
    queryFn: () => getTransactionLogs(exchange!),
    refetchInterval: TRANSACTION_LOG_FETCH_INTERVAL_MS,
  });
};
