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
  const { store, setStore } = useStrategyStore();
  const { customStrategy } = store;

  const handleCustomStrategy = (strategy: typeof customStrategy) => {
    setStore({ customStrategy: strategy });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className={className} variant="outline" size="icon">
          <span className="text-xs">{customStrategy}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => handleCustomStrategy('전략1')}>전략1</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCustomStrategy('전략2')}>전략2</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleCustomStrategy('전략3')}>전략3</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
