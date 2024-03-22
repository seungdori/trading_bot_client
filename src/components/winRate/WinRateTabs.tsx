import InfoTabs from '@/components/assetsTable/InfoTabs.tsx';
import { WinRateTab } from '@/types/tableTypes.ts';
import WinRateTableWrapper from '@/components/winRate/WinRateTableWrapper.tsx';
import { useExchangeStore } from '@/store/exchangeStore.ts';
import { Exchange } from '@/types/exchangeTypes.ts';

export default function WinRateTabs({ className }: { className?: string }) {
  const { exchange } = useExchangeStore();
  const tabs = buildTabs(exchange);
  return <InfoTabs className={className} defaultTableId={tabs.defaultId} tables={tabs.tabs} renderBackButton />;
}

function buildTabs(exchange: Exchange): {
  defaultId: WinRateTab['id'];
  tabs: WinRateTab[];
} {
  return {
    defaultId: exchange,
    tabs: [
      {
        id: 'binance',
        displayName: '바이낸스',
        component: <WinRateTableWrapper exchange="binance" />,
      },
      {
        id: 'bithumb',
        displayName: '빗썸',
        component: <WinRateTableWrapper exchange="bithumb" />,
      },
      {
        id: 'upbit',
        displayName: '업비트',
        component: <WinRateTableWrapper exchange="upbit" />,
      },
    ],
  };
}
