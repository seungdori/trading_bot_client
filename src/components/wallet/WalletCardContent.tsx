import { CardContent } from '@/components/ui/card.tsx';
import { Separator } from '@/components/ui/separator.tsx';

type Props = {
  balance: string;
  unrealizedProfit: string;
  className?: string;
};

export default function WalletCardContent({ balance, unrealizedProfit, className }: Props) {
  return (
    <div className={className}>
      <CardContent className="flex flex-col justify-center space-y-2 p-6">
        <div className="text-3xl font-bold">{balance}</div>
        <div className="text-sm font-medium text-gray-500 dark:text-gray-400">Available balance</div>
      </CardContent>
      <Separator />
      <CardContent className="flex flex-col gap-1 p-6">
        <div className="flex flex-col">
          <div className="font-bold">Unrealized Profit</div>
          <div className="font-semibold">{unrealizedProfit}</div>
        </div>
        {/*Todo: remove*/}
        <div className="flex flex-col">
          <div className="font-bold">Transfer</div>
          <div className="font-semibold">$0.0</div>
        </div>
        <div className="flex flex-col">
          <div className="font-bold">Withdrawal</div>
          <div className="font-semibold">$0.0</div>
        </div>
      </CardContent>
    </div>
  );
}
