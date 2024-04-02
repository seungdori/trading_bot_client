import { RemovableTextArea } from '@/components/common/RemovableTextArea.tsx';
import { ReactNode } from 'react';

type Props = {
  content: string;
  className?: string;
  children?: ReactNode;
};

export default function TransactionLog({ className, content, children }: Props) {
  return (
    <RemovableTextArea className={className} placeholder="Trading log" value={content} disabled
    >
      {children}
    </RemovableTextArea>
  );
}
