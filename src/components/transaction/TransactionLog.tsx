import { RemovableTextArea } from '@/components/common/RemovableTextArea.tsx';
import { ReactNode } from 'react';
import { useEffect, useRef } from 'react';

type Props = {
  content: string;
  className?: string;
  children?: ReactNode;
};

export default function TransactionLog({ className, content, children }: Props) {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textAreaRef.current) {
      const textArea = textAreaRef.current;
      textArea.scrollTop = textArea.scrollHeight; // 스크롤을 최하단으로 이동
    }
  }, [content]); // content가 변경될 때마다 useEffect 실행

  return (
    <div>
      <RemovableTextArea
        className={className}
        placeholder="Trading log"
        value={content}
        disabled
        ref={textAreaRef}
      />
      {children}
    </div>
  );
}