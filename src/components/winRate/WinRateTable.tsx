import ScrollableTable from '@/components/assetsTable/ScrollableTable.tsx';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/assetsTable/DataTable.tsx';
import { Button } from '@/components/ui/button.tsx';
import { ArrowUpDown } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox.tsx';
import { CustomStrategy, EnterStrategy, WinRate } from '@/types/backendTypes.ts';
import { useSelectedCoinStore } from '@/store/selectedCoinStore.ts';
import { Exchange } from '@/types/exchangeTypes.ts';
import { formatNum } from '@/lib/format.ts';

type Props = {
  exchange: Exchange;
  enterStrategy: EnterStrategy;
  customStrategy: CustomStrategy;
  assetsData: WinRate[];
};

type VidyaStrategyColum = WinRate;

type GridStrategyColum = Pick<WinRate, 'name' | 'total_win_rate'>;

function buildColumDef(props: Props): ColumnDef<VidyaStrategyColum>[] | ColumnDef<GridStrategyColum>[] {
  const { selectedCoin, setSelectedCoin } = useSelectedCoinStore(props);

  switch (props.customStrategy) {
    case '트랜드':
      const vidyaStrategyColumnsDef: ColumnDef<VidyaStrategyColum>[] = [
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
              <Button
                variant="ghost"
                className="flex flex-col w-full"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              >
                <span className="flex items-center">
                  종목 이름
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
              </Button>
            );
          },
          cell: ({ getValue }) => <span>{getValue() as string}</span>,
        },
        {
          accessorKey: 'long_win_rate',
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                className="flex flex-col w-full"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              >
                <span className="flex items-center">
                  롱 승률
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
              </Button>
            );
          },
          cell: ({ getValue }) => (
            <span>
              {formatNum({
                num: getValue() as number,
                precision: 1,
              })}
            </span>
          ),
        },
        {
          accessorKey: 'short_win_rate',
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                className="flex flex-col w-full"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              >
                <span className="flex items-center">
                  숏 승률
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
              </Button>
            );
          },
          cell: ({ getValue }) => (
            <span>
              {formatNum({
                num: getValue() as number,
                precision: 1,
              })}
            </span>
          ),
        },
        {
          accessorKey: 'total_win_rate',
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                className="flex flex-col w-full"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              >
                <span className="flex items-center">
                  토탈 승률
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
              </Button>
            );
          },
          cell: ({ getValue }) => (
            <span>
              {formatNum({
                num: getValue() as number,
                precision: 1,
              })}
            </span>
          ),
        },
      ];
      return vidyaStrategyColumnsDef;

    case '그리드':
      const gridStrategyColumnsDef: ColumnDef<GridStrategyColum>[] = [
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
              <Button
                variant="ghost"
                className="flex flex-col w-full"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              >
                <span className="flex items-center">
                  종목 이름
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
              </Button>
            );
          },
          cell: ({ getValue }) => <span>{getValue() as string}</span>,
        },
        {
          accessorKey: 'total_win_rate',
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                className="flex flex-col w-full"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              >
                <span className="flex items-center">
                  수익률
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
              </Button>
            );
          },
          cell: ({ getValue }) => (
            <span>
              {formatNum({
                num: getValue() as number,
                precision: 1,
              })}
            </span>
          ),
        },
      ];
      return gridStrategyColumnsDef;

    // Todo: Impl after
    case '전략3':
    default:
      const unknownStrategyColumnsDef: ColumnDef<WinRate>[] = [
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
              <Button
                variant="ghost"
                className="flex flex-col w-full"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              >
                <span className="flex items-center">
                  종목 이름
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
              </Button>
            );
          },
          cell: ({ getValue }) => <span>{getValue() as string}</span>,
        },
        {
          accessorKey: 'long_win_rate',
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                className="flex flex-col w-full"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              >
                <span className="flex items-center">
                  롱 승률
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
              </Button>
            );
          },
        },
        {
          accessorKey: 'short_win_rate',
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                className="flex flex-col w-full"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              >
                <span className="flex items-center">
                  숏 승률
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
              </Button>
            );
          },
        },
        {
          accessorKey: 'total_win_rate',
          header: ({ column }) => {
            return (
              <Button
                variant="ghost"
                className="flex flex-col w-full"
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
              >
                <span className="flex items-center">
                  토탈 승률
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </span>
              </Button>
            );
          },
        },
      ];
      return unknownStrategyColumnsDef;
  }
}

function renderWinRateTable(props: Props) {
  const columnsDef = buildColumDef(props);

  switch (props.customStrategy) {
    case '트랜드':
      return <DataTable columns={columnsDef as ColumnDef<VidyaStrategyColum>[]} data={props.assetsData} />;

    case '그리드':
      return <DataTable columns={columnsDef as ColumnDef<GridStrategyColum>[]} data={props.assetsData} />;

    // Todo: Impl after
    case '전략3':
    default:
      return <DataTable columns={columnsDef as ColumnDef<WinRate>[]} data={props.assetsData} />;
  }
}

export default function WinRateTable(props: Props) {
  return <ScrollableTable>{renderWinRateTable(props)}</ScrollableTable>;
}
