import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';

type Props = { className?: string };

export default function CustomStrategyDropdownMenu({ className }: Props) {
  const { customStrategy, setCustomStrategy } = useStrategyStore();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={className} variant="outline" size="icon">
          <span className="text-xs">{customStrategy}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setCustomStrategy('전략1')}>전략1</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCustomStrategy('전략2')}>전략2</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setCustomStrategy('전략3')}>전략3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
