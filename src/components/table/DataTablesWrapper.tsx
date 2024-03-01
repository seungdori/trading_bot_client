import * as React from 'react';
import { IDataTable } from '@/types/tableTypes.ts';

import TableTabs from '@/components/table/TableTabs.tsx';
import HistoryTable from '@/components/table/HistoryTable.tsx';
import AssetsTable from '@/components/table/AssetsTable.tsx';
import DataTable from '@/components/table/DataTable.tsx';
import { ColumnDef } from '@tanstack/react-table';
import { getMockAssetsData, getMockHistoryData, MockData } from '@/components/api/DesktopClient.tsx';

type Props = { className?: string };

export default function DataTablesWrapper({ className }: Props) {
  // const dataTables = React.use(buildTables());
  console.log('[dataTables]', dataTables);
  return <TableTabs className={className} defaultTableId={dataTables.defaultId} tables={dataTables.tables} />;
}

async function buildTables(): Promise<{
  defaultId: IDataTable['id'];
  tables: IDataTable[];
}> {
  const mockColumns: ColumnDef<MockData>[] = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'age',
      header: 'AGE',
    },
  ];

  const historyMockData = await getMockHistoryData();
  const assetsMockData = await getMockAssetsData();

  return {
    defaultId: 'history',
    tables: [
      {
        id: 'history',
        displayName: '거래 기록',
        component: <DataTable columns={mockColumns} data={historyMockData} />,
        // component: <HistoryTable className="w-full h-2/5" />,
      },
      {
        id: 'assets',
        displayName: '자산 목록',
        component: <DataTable columns={mockColumns} data={assetsMockData} />,
        // component: <AssetsTable className="w-full h-2/5" />,
      },
    ],
  };
}
