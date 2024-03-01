import * as React from 'react';
import ScrollableTable from '@/components/table/ScrollableTable.tsx';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/table/DataTable.tsx';
import { IAssetsTable } from '@/types/tableTypes';

type Props = { className?: string };

export default function AssetsTable({ className }: Props) {
  const mockColumns: ColumnDef<IAssetsTable>[] = [
    {
      accessorKey: 'coinName',
      header: '코인명',
    },
    {
      accessorKey: 'initPrice',
      header: '진입가격',
    },
    {
      accessorKey: 'currentPrice',
      header: '현재가격',
    },
    {
      accessorKey: 'amount',
      header: '보유수량',
    },
    {
      accessorKey: 'rateOfReturn',
      header: '수익률',
    },
    {
      accessorKey: 'sellPrice',
      header: '손절가',
    },
    {
      accessorKey: 'tp1',
      header: 'TP1',
    },
    {
      accessorKey: 'tp2',
      header: 'TP2',
    },
    {
      accessorKey: 'tp3',
      header: 'TP3',
    },
    {
      accessorKey: 'value',
      header: '가치',
    },
  ];

  return (
    <ScrollableTable className={className}>
      <DataTable columns={mockColumns} data={[]} />
    </ScrollableTable>
  );
}
