import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { cn } from '@/lib/utils.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';
import AllCoinSellButton from '@/components/table/AllCoinSellButton.tsx';
import CoinSellButton from '@/components/table/CoinSellButton.tsx';
import AiSearchButton from '@/components/table/AiSearchButton.tsx';

type Props = { className?: string };

export default function ExchangePanel({ className }: Props) {
  const { exchange } = useExchangeStore();

  return (
    <Card className={cn('container w-full flex flex-col justify-evenly', className)}>
      <AiSearchButton exchange={exchange} />
      <AllCoinSellButton exchange={exchange} />
      <CoinSellButton exchange={exchange} />
      <Button>새로 고침</Button>
    </Card>
  );
}
