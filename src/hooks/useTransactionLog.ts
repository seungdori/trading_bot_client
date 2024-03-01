import { useParams } from 'react-router-dom';
import { TradingSearchParamsSchema } from '@/schemas/searchParamsSchema.ts';
import { useQuery } from '@tanstack/react-query';
import { getTransactionLog } from '@/components/api/DesktopClient.tsx';

const TRANSACTION_LOG_FETCH_INTERVAL_MS = 10000;

export const useTransactionLog = () => {
  const params = useParams();
  const { exchange } = TradingSearchParamsSchema.parse(params);

  return useQuery({
    queryKey: ['transactionLog', exchange],
    queryFn: () => getTransactionLog(exchange),
    refetchInterval: TRANSACTION_LOG_FETCH_INTERVAL_MS,
  });
};
