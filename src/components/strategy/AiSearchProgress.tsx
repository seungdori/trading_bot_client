import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label.tsx';
import { cn } from '@/lib/utils.ts';

type Props = {
  completedSymbolCount: number;
  totalSymbolCount: number;
  className?: string;
};

export default function AiSearchProgress({ completedSymbolCount, totalSymbolCount, className }: Props) {
  const progress = buildProgressPercentage(completedSymbolCount, totalSymbolCount);

  return (
    <div className={cn('w-full flex items-center flex-col', className)}>
      <Label>
        {completedSymbolCount} / {totalSymbolCount} 종목 탐색 완료 ({progress}%)
      </Label>
      <Progress value={progress} max={100} className="w-full" />
    </div>
  );
}

function buildProgressPercentage(completedSymbolCount: number, totalSymbolCount: number): number {
  if (totalSymbolCount === 0) {
    return 0;
  }

  return Math.floor((completedSymbolCount / totalSymbolCount) * 100);
}
