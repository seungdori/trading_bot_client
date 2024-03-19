import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabDefaultProps } from '@/types/tableTypes.ts';
import { cn } from '@/lib/utils.ts';

type TableTabProps = TabDefaultProps;

type Props = {
  defaultTableId: TableTabProps['id'];
  tables: TableTabProps[];
  className?: string;
};

export default function InfoTabs({ defaultTableId, tables, className }: Props) {
  return (
    <Tabs
      defaultValue={defaultTableId}
      className={cn('rounded-lg border bg-card text-card-foreground shadow-sm', className)}
    >
      <div className="flex justify-center">
        <TabsList className={cn(`w-[400px] grid grid-cols-${tables.length}`)}>
          {tables.map((table) => (
            <TabsTrigger key={table.id} value={table.id}>
              {table.displayName}
            </TabsTrigger>
          ))}
        </TabsList>
      </div>
      {tables.map((table) => (
        <TabsContent key={table.id} value={table.id}>
          {table.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}
