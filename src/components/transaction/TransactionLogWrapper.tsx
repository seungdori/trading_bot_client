import { Button } from '@/components/ui/button.tsx';
import { ClipboardCopy, XIcon } from 'lucide-react';
import { useExchangeStore } from '@/store/exchangeStore.ts';
import { useTradingLog } from '@/hooks/useTransactionLog.ts';
import TransactionLog from '@/components/transaction/TransactionLog.tsx';
import LogClearDialog from '@/components/transaction/LogClearDialog.tsx';

type Props = { className?: string };

export default function TransactionLogWrapper({ className }: Props) {
  const { exchange } = useExchangeStore();
  const { logs, clear } = useTradingLog({ exchange: exchange, delimiter: '\n', defaultMessage: 'Trading log' });

  return (
    <TransactionLog className={className} content={logs}>
      <div className="grid grid-cols-2 w-full space-x-2">
        <Button disabled>
          <ClipboardCopy className="w-4 h-4" />
        </Button>
        <LogClearDialog action={clear}>
          <Button>
            <XIcon className="w-4 h-4" />
          </Button>
        </LogClearDialog>
      </div>
    </TransactionLog>
  );
}
