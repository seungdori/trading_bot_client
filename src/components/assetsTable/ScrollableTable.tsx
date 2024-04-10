import * as React from 'react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils.ts';

type Props = { className?: string; children?: React.ReactNode };

export default function ScrollableTable({ className, children }: Props) {
  return (
    <ScrollArea className={cn('rounded-md border', className)} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ minWidth: '800px', width: '100%' }}>{children}</div>
      <ScrollBar orientation="horizontal" />
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}