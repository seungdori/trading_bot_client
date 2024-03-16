import { useTransactionLog } from '@/hooks/useTransactionLog.ts';
import TransactionLog from '@/components/transaction/TransactionLog.tsx';
import TableSkeleton from '@/components/table/TableSkeleton.tsx';
import { useExchangeStore } from '@/store/exchangeStore.ts';

type Props = { className?: string };

export default function TransactionLogWrapper({ className }: Props) {
  const { exchange } = useExchangeStore();
  const { data, isPending } = useTransactionLog(exchange);

  if (isPending || !data) {
    return <TableSkeleton />;
  }

  const log = data.join('\n\n\n');

  return <TransactionLog className={className} content={log} />;
}
