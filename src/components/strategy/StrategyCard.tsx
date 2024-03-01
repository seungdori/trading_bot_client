import { Card } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import StrategyDropdownMenu from '@/components/strategy/StrategyDropdownMenu.tsx';

export default function StrategyCard() {
  return (
    <Card className="w-full h-full flex flex-col justify-between">
      <StrategyDropdownMenu className="w-full" />
      <Button>Start</Button>
      <Button>Stop</Button>
      <Button>Test</Button>
    </Card>
  );
}
