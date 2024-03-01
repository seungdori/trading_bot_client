import * as React from 'react';
import ScrollableTable from '@/components/table/ScrollableTable.tsx';
import MockTable from '@/components/MockTable.tsx';

type Props = { className?: string };

export default function HistoryTable({ className }: Props) {
  return (
    <ScrollableTable className={className}>
      <MockTable />
    </ScrollableTable>
  );
}
