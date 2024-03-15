import { toast } from '@/components/ui/use-toast.ts';
import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { Exchange } from '@/types/exchangeTypes.ts';

type Props = { exchange: Exchange };

export default function AiSearchButton({ exchange }: Props) {
  const handleAiSearch = () => {
    // Todo: confirm design
    // toast({
    //   className: cn('fixed z-50 top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4 flex md:max-w-[420px]'),
    //   title: 'AI 탐색을 시작합니다.',
    //   description: <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4 text-white">...</pre>,
    // });
    toast({
      title: 'AI 탐색을 시작합니다.',
    });
  };

  return <Button onClick={handleAiSearch}>AI 탐색 종목</Button>;
}
