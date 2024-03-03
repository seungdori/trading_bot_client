import { Card } from '@/components/ui/card.tsx';
import { Button } from '@/components/ui/button.tsx';
import CustomStrategyDropdownMenu from '@/components/strategy/CustomStrategyDropdownMenu.tsx';
import { cn } from '@/lib/utils.ts';

type Props = { className?: string };

export default function CustomStrategyCard({ className }: Props) {
  return (
    <Card className={cn('container flex flex-col justify-evenly', className)}>
      <CustomStrategyDropdownMenu className="w-full" />
      <Button>Start</Button>
      <Button>Stop</Button>
      <Button>Test</Button>
    </Card>
  );
}
