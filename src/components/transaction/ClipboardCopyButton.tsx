import { Button } from '@/components/ui/button.tsx';
import { ClipboardCopy } from 'lucide-react';
import { useCopyToClipboard } from '@/hooks/useClipboard.ts';

type Props = { text: string };

export default function ClipboardCopyButton({ text }: Props) {
  const copyMutation = useCopyToClipboard();
  const handleCopy = () => copyMutation.mutate(text);

  return (
    <Button disabled={copyMutation.isPending} onClick={handleCopy}>
      <ClipboardCopy className="w-4 h-4" />
    </Button>
  );
}
