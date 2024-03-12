import { InfoTab } from '@/types/tableTypes.ts';
import InfoTabs from '@/components/table/InfoTabs.tsx';
import AssetsTableWrapper from '@/components/table/AssetsTableWrapper.tsx';
import TransactionLogWrapper from '@/components/transaction/TransactionLogWrapper.tsx';
import { useFetchPositions } from '@/hooks/useAssetsData.ts';

type Props = { className?: string };

export default function DataTablesWrapper({ className }: Props) {
  cachePositions();
  const tabs = buildTabs();
  return <InfoTabs className={className} defaultTableId={tabs.defaultId} tables={tabs.tabs} />;
}

function buildTabs(): {
  defaultId: InfoTab['id'];
  tabs: InfoTab[];
} {
  return {
    defaultId: 'history',
    tabs: [
      {
        id: 'history',
        displayName: '거래 기록',
        component: <TransactionLogWrapper className="h-[30vh] md:h-[40vh]" />,
      },
      {
        id: 'assets',
        displayName: '자산 목록',
        component: <AssetsTableWrapper />,
      },
    ],
  };
}

/**
 * @description fetches positions from exchanges and caches them.
 */
function cachePositions() {
  useFetchPositions('binance');
  useFetchPositions('upbit');
  // useFetchPositions('bithumb');
}
