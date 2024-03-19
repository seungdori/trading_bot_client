import WinRateTable from '@/components/winRate/WinRateTable.tsx';
import { useWinRates } from '@/hooks/useWinRates.ts';
import { Icons } from '@/components/common/Icons.tsx';
import { Exchange } from '@/types/exchangeTypes.ts';
import { Button } from '@/components/ui/button.tsx';
import { useCreateChartImage } from '@/hooks/useCreateChartImage.ts';
import { useSelectedCoinStore } from '@/store/selectedCoinStore.ts';
import { toast } from '@/components/ui/use-toast.ts';

export default function WinRatePage() {
  const exchange: Exchange = 'binance';

  return (
    <main className="h-full w-full">
      <WinRateTableWrapper exchange={exchange} />
    </main>
  );
}

function WinRateTableWrapper({ exchange }: { exchange: Exchange }) {
  const { isLoading, data } = useWinRates(exchange);
  return (
    <>
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <WinRateTable exchange={exchange} assetsData={data ?? []} />
      )}
      <ShowCoinChartButton exchange={exchange} />
    </>
  );
}

function ShowCoinChartButton({ exchange }: { exchange: Exchange }) {
  const { selectedCoin } = useSelectedCoinStore(exchange);
  const showCoinChartMutation = useCreateChartImage(exchange);

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
  return <Button onClick={handleShowCoinChart}>해당 종목 차트 보기</Button>;
}
