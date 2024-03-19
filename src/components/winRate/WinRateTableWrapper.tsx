import { Exchange } from '@/types/exchangeTypes.ts';
import { useWinRates } from '@/hooks/useWinRates.ts';
import { useQueryParam } from 'use-query-params';
import { Icons } from '@/components/common/Icons.tsx';
import WinRateTable from '@/components/winRate/WinRateTable.tsx';
import ShowCoinChartButton from '@/components/winRate/ShowCoinChartButton.tsx';
import { cn } from '@/lib/utils.ts';

export default function WinRateTableWrapper({ exchange, className }: { exchange: Exchange; className?: string }) {
  const { isLoading, data } = useWinRates(exchange);
  const [imageUrl] = useQueryParam('coinChartImageUrl');

  return (
    <section className={cn('space-y-4', className)}>
      <WinRateTable exchange={exchange} assetsData={data ?? []} />
      {isLoading ? (
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      ) : (
        <ShowCoinChartButton exchange={exchange} />
      )}

      {/*Hack. revalidate the tauri image cache*/}
      {imageUrl ? <img src={`${imageUrl}?${Date.now()}`} /> : null}
    </section>
  );
}
