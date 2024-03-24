import { useStrategyStore } from '@/hooks/useStrategyStore.ts';
import { useStartCustomStrategy } from '@/hooks/useStartCustomStrategy.ts';
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

type Props = { className?: string };

export default function StartFeatureButton({ className }: Props) {
  const { exchange, store } = useStrategyStore();
  const startMutation = useStartCustomStrategy({ exchange, strategy: store.customStrategy });
  const handleStart = () => {
    // Todo: Add start strategy logic
    startMutation.mutate({
      exchange,
      store,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className={className} disabled={startMutation.isPending}>
          {startMutation.isPending ? <Icons.spinner className="h-4 w-4 animate-spin" /> : <span>Start</span>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>매매를 시작 하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>매매 시작 버튼을 누르면 자동 매매를 시작합니다.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
          <AlertDialogAction onClick={handleStart}>매매 시작</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
