import { Textarea } from '@/components/ui/textarea';

type Props = { content: string; className?: string };
export default function TransactionLog({ content, className }: Props) {
  return <Textarea className={className} placeholder="Type your message here." value={content} disabled />;
}
