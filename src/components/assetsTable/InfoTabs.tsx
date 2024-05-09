import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TabDefaultProps } from '@/types/tableTypes.ts';
import { cn } from '@/lib/utils.ts';
import BackButton from '@/components/common/BackButton.tsx';

type TableTabProps = TabDefaultProps;

type Props = {
  defaultTableId: TableTabProps['id'];
  tables: TableTabProps[];
  renderBackButton?: boolean;
  className?: string;
};

export default function InfoTabs({ defaultTableId, tables, className, renderBackButton }: Props) {
  return (
    <Tabs
      defaultValue={defaultTableId}
      className={cn('w-full flex flex-col rounded-lg border bg-card text-card-foreground shadow-sm h-[200px]', className)}
    >
      {renderBackButton ? (
        <TabListWithBackButton tables={tables} className="w-full flex justify-center" />
      ) : (
        <TabList tables={tables} className="w-full flex justify-center" />
      )}
      {tables.map((table) => (
        <TabsContent key={table.id} value={table.id} className="h-full w-full">
          {table.component}
        </TabsContent>
      ))}
    </Tabs>
  );
}

type TabListProps = {
  tables: TableTabProps[];
  className?: string;
};

function TabList({ tables, className }: TabListProps) {
  return (
    <div className={className}>
      <TabsList className={cn(`w-full flex-1 min-w-[800px] grid grid-cols-4 grid-rows-2`)}>
        {tables.map((table) => (
          <TabsTrigger key={table.id} value={table.id}>
            {table.displayName}
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  );
}

function TabListWithBackButton({ tables, className }: TabListProps) {
  return (
    <div className={className}>
      {/*Spacing*/}
      <div className="flex-1"></div>
      <TabsList className={cn(`flex-1 w-full min-w-[800px] grid grid-cols-4 grid-rows-2`)}>
        {tables.map((table) => (
          <TabsTrigger key={table.id} value={table.id}>
            {table.displayName}
          </TabsTrigger>
        ))}
      </TabsList>
      <div className="flex-1 flex justify-end">
        <BackButton className="w-1/4">뒤로가기</BackButton>
      </div>
    </div>
  );
}

