import InfoTabs from '@/components/assetsTable/InfoTabs.tsx';
import { WinRateTab } from '@/types/tableTypes.ts';
import WinRateTableWrapper from '@/components/winRate/WinRateTableWrapper.tsx';
import { Exchange } from '@/types/exchangeTypes.ts';
import { EXCHANGE } from '@/constants/exchange.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';

type Props = {
  className?: string;
};

export default function WinRateTabs({ className }: Props) {
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
        id: EXCHANGE.BINANCE.EXCHANGE,
        displayName: EXCHANGE.BINANCE.NAME,
        component: <WinRateTableWrapper exchange="binance" />,
      },
      {
        id: EXCHANGE.BINANCE_SPOT.EXCHANGE,
        displayName: EXCHANGE.BINANCE_SPOT.NAME,
        component: <WinRateTableWrapper exchange="binance_spot" />,
      },
      {
        id: EXCHANGE.BITHUMB.EXCHANGE,
        displayName: EXCHANGE.BITHUMB.NAME,
        component: <WinRateTableWrapper exchange="bithumb" />,
      },
      {
        id: EXCHANGE.UPBIT.EXCHANGE,
        displayName: EXCHANGE.UPBIT.NAME,
        component: <WinRateTableWrapper exchange="upbit" />,
      },
      {
        id: EXCHANGE.BITGET.EXCHANGE,
        displayName: EXCHANGE.BITGET.NAME,
        component: <WinRateTableWrapper exchange="bitget" />,
      },

      {
        id: EXCHANGE.BITGET_SPOT.EXCHANGE,
        displayName: EXCHANGE.BITGET_SPOT.NAME,
        component: <WinRateTableWrapper exchange="bitget_spot" />,
      },
      {
        id: EXCHANGE.OKX.EXCHANGE,
        displayName: EXCHANGE.OKX.NAME,
        component: <WinRateTableWrapper exchange="okx" />,
      },
      {
        id: EXCHANGE.OKX_SPOT.EXCHANGE,
        displayName: EXCHANGE.OKX_SPOT.NAME,
        component: <WinRateTableWrapper exchange="okx_spot" />,
      },

    ],
  };
}
