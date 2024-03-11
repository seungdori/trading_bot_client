import EnterStrategySelect from '@/components/strategy/EnterStrategySelect.tsx';
import LeveragePanel from '@/components/strategy/LeveragePanel.tsx';
import EnterSymbol from '@/components/strategy/EnterSymbol.tsx';
import { Separator } from '@/components/ui/separator.tsx';
import { Card } from '@/components/ui/card.tsx';
import { cn } from '@/lib/utils.ts';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';

type Props = { className?: string };
export default function StrategyPanel({ className }: Props) {
  const { exchange } = useStrategyStore();

  return (
    <Card className={cn('container w-full flex flex-col space-y-4', className)}>
      <EnterStrategySelect className="w-full" />
      <Separator />
      <EnterSymbol />
      <Separator />
      {exchange === 'binance' && <LeveragePanel />}
    </Card>
  );
}
