import { useTransactionLog } from '@/hooks/useTransactionLog.ts';
import TransactionLog from '@/components/transaction/TransactionLog.tsx';
import TableSkeleton from '@/components/table/TableSkeleton.tsx';

type Props = { className?: string };

export default function TransactionLogWrapper({ className }: Props) {
  const { data, isPending } = useTransactionLog();

  if (isPending || !data) {
    return <TableSkeleton />;
  }

  return (
    <>
      <TransactionLog className={className} content={data} />
    </>
  );
}
