import { CardContent } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';

type Props = {
  balance: string;
  unrealizedProfit: string;
  totalBalance: string | null;
  className?: string;
};

export default function WalletCardContent({ balance, totalBalance, unrealizedProfit, className }: Props) {
  return (
    <div className={className}>
      <CardContent className="flex flex-col justify-center space-y-2 p-6">
        <div className="text-3xl font-bold">{balance}</div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Available balance</div>
      </CardContent>
      <Separator />
      <CardContent className="flex flex-col gap-1 p-6">
        <div className="flex flex-col">
          <div className="font-bold">미실현 이익</div>
          <div className="font-semibold">{unrealizedProfit}</div>
        </div>
        {totalBalance && (
          <div className="flex flex-col">
            <div className="font-bold">총 잔고</div>
            <div className="font-semibold">{totalBalance}</div>
          </div>
        )}
      </CardContent>
    </div>
  );
}
