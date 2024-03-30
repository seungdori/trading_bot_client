import { useTradingLog } from '@/hooks/useTransactionLog.ts';
import TransactionLog from '@/components/transaction/TransactionLog.tsx';
import LogClearDialog from '@/components/transaction/LogClearDialog.tsx';
import ClipboardCopyButton from '@/components/transaction/ClipboardCopyButton.tsx';
import { cn } from '@/lib/utils.ts';

type Props = { className?: string };

export default function TransactionLogWrapper({ className }: Props) {
  // const { exchange } = useExchangeStore(); // Todo: 거래소 마다 로그 확인 요구사항 변경시 사용
  const { log, clear } = useTradingLog({ exchange: 'binance', delimiter: '\n', defaultMessage: 'Trading log' });

  return (
    <TransactionLog className={cn('h-full', className)} content={log}>
      <div className="grid grid-cols-2 w-full h-full space-x-2">
        <ClipboardCopyButton text={log} />
        <LogClearDialog action={clear} />
      </div>
    </TransactionLog>
  );
}
