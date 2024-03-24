import { useExchangeStore } from '@/store/exchangeStore.ts';
import { useTradingLog } from '@/hooks/useTransactionLog.ts';
import TransactionLog from '@/components/transaction/TransactionLog.tsx';
import LogClearDialog from '@/components/transaction/LogClearDialog.tsx';
import ClipboardCopyButton from '@/components/transaction/ClipboardCopyButton.tsx';

type Props = { className?: string };

export default function TransactionLogWrapper({ className }: Props) {
  const { exchange } = useExchangeStore();
  const { log, clear } = useTradingLog({ exchange: exchange, delimiter: '\n', defaultMessage: 'Trading log' });

  return (
    <TransactionLog className={className} content={log}>
      <div className="grid grid-cols-2 w-full space-x-2">
        <ClipboardCopyButton text={log} />
        <LogClearDialog action={clear} />
      </div>
    </TransactionLog>
  );
}
