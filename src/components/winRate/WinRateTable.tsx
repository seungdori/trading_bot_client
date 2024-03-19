import ScrollableTable from '@/components/assetsTable/ScrollableTable.tsx';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/assetsTable/DataTable.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ArrowUpDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { WinRate } from '@/types/backendTypes.ts';
import { useSelectedCoinStore } from '@/store/selectedCoinStore.ts';
import { Exchange } from '@/types/exchangeTypes.ts';

type Props = { exchange: Exchange; assetsData: WinRate[] };

export default function WinRateTable({ exchange, assetsData }: Props) {
  const { selectedCoin, setSelectedCoin } = useSelectedCoinStore(exchange);
  const columnsDef: ColumnDef<WinRate>[] = [
    {
      id: 'select',
      header: () => null,
      cell: ({ row }) => (
        <Checkbox
          checked={selectedCoin === row.original.name}
          onCheckedChange={() => {
            // Toggle selection: If it's already selected, clear selection; otherwise, select it.
            setSelectedCoin(selectedCoin === row.original.name ? undefined : row.original.name);
          }}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'name',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            종목 이름
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'long_win_rate',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            롱 승률
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'short_win_rate',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            숏 승률
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
    {
      accessorKey: 'total_win_rate',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            토탈 승률
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
    },
  ];

  return (
    <ScrollableTable>
      <DataTable columns={columnsDef} data={assetsData} />
    </ScrollableTable>
  );
}
