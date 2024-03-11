import { CardContent } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';

type Props = {
  balance: string;
  className?: string;
};

export default function WalletCardContent({ balance, className }: Props) {
  return (
    <div className={className}>
      <CardContent className="flex flex-col justify-center space-y-2 p-6">
        <div className="text-3xl font-bold">{balance}</div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Available balance</div>
      </CardContent>
      <Separator />
      <CardContent className="flex flex-col gap-1 p-6">
        <div className="flex items-center justify-between">
          <div className="font-semibold">Deposit</div>
          <div className="font-semibold">+$1,000.00</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="font-semibold">Transfer</div>
          <div className="font-semibold">-$500.00</div>
        </div>
        <div className="flex items-center justify-between">
          <div className="font-semibold">Withdrawal</div>
          <div className="font-semibold">-$258.71</div>
        </div>
      </CardContent>
    </div>
  );
}
