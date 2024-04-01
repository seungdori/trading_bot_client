import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { cn } from '@/lib/utils.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';
import AllCoinSellButton from '@/components/assetsTable/AllCoinSellButton.tsx';
import CoinSellButton from '@/components/assetsTable/CoinSellButton.tsx';
import AiSearchAssetsButton from '@/components/assetsTable/AiSearchAssetsButton.tsx';
import BlackListButton from '@/components/symbols/BlackListButton.tsx';
import WhiteListButton from '@/components/symbols/WhiteListButton.tsx';

type Props = { className?: string };

export default function ExchangePanel({ className }: Props) {
  const { exchange } = useExchangeStore();

  return (
    <Card className={cn('container w-full flex flex-col justify-evenly p-4 space-y-4', className)}>
      <AiSearchAssetsButton />
      <CoinSellButton exchange={exchange} />
      <AllCoinSellButton exchange={exchange} />
      <Button disabled>새로 고침</Button>
      <BlackListButton />
      <WhiteListButton />
    </Card>
  );
}
