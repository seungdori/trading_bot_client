import { Progress } from '@/components/ui/progress';
import { Label } from '@/components/ui/label.tsx';
import { cn } from '@/lib/utils.ts';

type Props = {
  currentProgressSymbol: string;
  completedSymbolCount: number;
  totalSymbolCount: number;
  className?: string;
};

export default function AiSearchProgress({
  currentProgressSymbol,
  completedSymbolCount,
  totalSymbolCount,
  className,
}: Props) {
  const progress = buildProgressPercentage(completedSymbolCount, totalSymbolCount);

  return (
    <div className={cn('w-full flex items-center flex-col', className)}>
      <Label className="w-full text-center space-y-2">
        <p className="font-bold text-sm">현재 진행 중인 종목</p>
        <p className="font-semibold text-sm">{currentProgressSymbol}</p>
        <p className="text-xs">
          {completedSymbolCount} / {totalSymbolCount} 종목 탐색 완료 ({progress}%)
        </p>
      </Label>
      <Progress value={progress} max={100} className="w-full" />
    </div>
  );
}

function buildProgressPercentage(completedSymbolCount: number, totalSymbolCount: number): number {
  if (totalSymbolCount === 0) {
    return 0;
  }

  return Math.round((completedSymbolCount / totalSymbolCount) * 100);
}
