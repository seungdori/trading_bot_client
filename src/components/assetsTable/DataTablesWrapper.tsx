import { InfoTab } from '@/types/tableTypes.ts';
import InfoTabs from '@/components/assetsTable/InfoTabs.tsx';
import AssetsTableWrapper from '@/components/assetsTable/AssetsTableWrapper.tsx';
// import { cachePositions } from '@/hooks/useCachePosition.ts';
import TransactionLogWrapper from '@/components/transaction/TransactionLogWrapper';

type Props = { className?: string };

export default function DataTablesWrapper({ className }: Props) {
  // cachePositions(); // Todo: remove

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
        component: <TransactionLogWrapper className="" />,
      },
      {
        id: 'assets',
        displayName: '자산 목록',
        component: <AssetsTableWrapper />,
      },
    ],
  };
}
