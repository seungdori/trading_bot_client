import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils.ts';
import { IDataTable } from '@/types/tableTypes.ts';

// 거래 기록, 자산 목록
type TableTabProps = IDataTable;

type Props = {
  defaultTableId: TableTabProps['id'];
  tables: TableTabProps[];
  className?: string;
};

export default function TableTabs({ defaultTableId, tables, className }: Props) {
  return (
    <Tabs defaultValue={defaultTableId} className={cn('w-[400px]', className)}>
      <TabsList className="grid w-full grid-cols-2">
        {tables.map((table) => (
          <TabsTrigger key={table.id} value={table.id}>
            {table.displayName}
          </TabsTrigger>
        ))}
      </TabsList>
      {tables.map((table) => (
        <TabsContent key={table.id} value={table.id}>
          {table.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}
