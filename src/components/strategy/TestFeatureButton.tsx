import { useTestFeature } from '@/hooks/useTestFeature.ts';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog.tsx';
import { Button } from '@/components/ui/button.tsx';
import { Icons } from '@/components/common/Icons.tsx';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';

type Props = { className?: string };

export default function TestFeatureButton({ className }: Props) {
  const { exchange, store } = useStrategyStore();
  const testMutation = useTestFeature({
    exchange,
    strategy: store.customStrategy,
  });

  const handleTest = () => {
    const leverage = exchange === 'binance' ? store.leverage : undefined;
    testMutation.mutate({
      exchange,
      leverage,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className={className} disabled={testMutation.isPending}>
          {testMutation.isPending ? <Icons.spinner className="h-4 w-4 animate-spin" /> : <span>Test</span>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>API를 테스트 하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>매매 로직 테스트를 시작합니다.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
          <AlertDialogAction onClick={handleTest}>API 테스트</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
