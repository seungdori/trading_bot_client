import { Exchange } from '@/types/exchangeTypes.ts';
import { useWinRates } from '@/hooks/useWinRates.ts';
import { useQueryParam } from 'use-query-params';
import { Icons } from '@/components/common/Icons.tsx';
import WinRateTable from '@/components/winRate/WinRateTable.tsx';
import ShowCoinChartButton from '@/components/winRate/ShowCoinChartButton.tsx';
import { cn } from '@/lib/utils.ts';
import { Button } from '@/components/ui/button.tsx';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';

export default function WinRateTableWrapper({ exchange, className }: { exchange: Exchange; className?: string }) {
  const {
    store: { customStrategy, enterStrategy },
  } = useStrategyStore();
  const { isLoading, data } = useWinRates({ exchange, customStrategy, enterStrategy });
  const [imageUrl] = useQueryParam('coinChartImageUrl');

  return (
    <section className={cn('w-full h-full space-y-4 flex flex-col', className)}>
      <WinRateTable
        exchange={exchange}
        customStrategy={customStrategy}
        enterStrategy={enterStrategy}
        assetsData={data ?? []}
      />
      {isLoading ? (
        <Button disabled className="w-full">
          <p className="flex flex-col justify-center items-center">
            <Icons.spinner className="h-4 w-4 animate-spin" />
            <span className="font-bold">AI 탐색 종목 로딩중....</span>
          </p>
        </Button>
      ) : (
        <ShowCoinChartButton exchange={exchange} customStrategy={customStrategy} enterStrategy={enterStrategy} />
      )}

      {/*Hack. revalidate the tauri image cache*/}
      {imageUrl ? <img src={`${imageUrl}?${Date.now()}`} /> : null}
    </section>
  );
}
