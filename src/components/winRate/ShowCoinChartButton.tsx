import { Exchange } from '@/types/exchangeTypes.ts';
import { useSelectedCoinStore } from '@/store/selectedCoinStore.ts';
import { useCreateChartImage } from '@/hooks/useCreateChartImage.ts';
import { useQueryParam } from 'use-query-params';
import { toast } from '@/components/ui/use-toast.ts';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button.tsx';
import { Icons } from '@/components/common/Icons.tsx';

export default function ShowCoinChartButton({ exchange }: { exchange: Exchange }) {
  const { selectedCoin } = useSelectedCoinStore(exchange);
  const showCoinChartMutation = useCreateChartImage(exchange);
  const [_, setImageUrl] = useQueryParam('coinChartImageUrl');

  const handleShowCoinChart = () => {
    if (!selectedCoin) {
      toast({ title: '선택된 종목이 없습니다.' });
      return;
    }

    showCoinChartMutation.mutate({
      exchange,
      coin: { symbol: selectedCoin },
    });
  };

  useEffect(() => {
    setImageUrl(showCoinChartMutation.data);
  }, [showCoinChartMutation.data]);

  return (
    <div className="flex flex-col w-full h-full">
      <Button disabled={showCoinChartMutation.isPending} onClick={handleShowCoinChart}>
        {showCoinChartMutation.isPending ? (
          <Icons.spinner className="h-4 w-4 animate-spin" />
        ) : (
          <p> 해당 종목 차트 보기</p>
        )}
      </Button>
    </div>
  );
}
