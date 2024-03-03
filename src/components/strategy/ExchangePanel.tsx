import { Button } from '@/components/ui/button.tsx';
import { Card } from '@/components/ui/card.tsx';
import { cn } from '@/lib/utils.ts';
import { toast } from '@/components/ui/use-toast.ts';

type Props = { className?: string };

export default function ExchangePanel({ className }: Props) {
  const handleAiSearch = () => {
    toast({
      className: cn('fixed z-50 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 flex md:max-w-[420px]'),
      title: 'AI 탐색을 시작합니다.',
      description: <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-white">...</pre>,
    });
  };
  return (
    <Card className={cn('container w-full flex flex-col justify-evenly', className)}>
      <Button onClick={handleAiSearch}>AI 탐색 종목</Button>
      <Button>전체 매도</Button>
      <Button>해당 코인 매도</Button>
      <Button>새로 고침</Button>
    </Card>
  );
}
