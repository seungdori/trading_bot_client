import { Icons } from '@/components/common/Icons.tsx';
import { useUpdater } from '@/hooks/useUpdater.tsx';

export default function InitPage() {
  useUpdater();

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      <p className="mt-4 text-lg font-bold">Checking update...</p>
    </div>
  );
}
