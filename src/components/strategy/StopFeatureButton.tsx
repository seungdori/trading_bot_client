import { useStrategyStore } from '@/hooks/useStrategyStore.ts';
import { useStopCustomStrategy } from '@/hooks/useStopCustomStrategy.ts';
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

export default function StopFeatureButton({ className }: Props) {
  const { exchange, store } = useStrategyStore();
  const stopMutation = useStopCustomStrategy({
    exchange,
    strategy: store.customStrategy,
  });

  const handleStop = () => {
    stopMutation.mutate({
      exchange,
      store,
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className={className} disabled={stopMutation.isPending}>
          {stopMutation.isPending ? <Icons.spinner className="h-4 w-4 animate-spin" /> : <span>Stop</span>}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>매매를 중지 하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>현재 진행중인 매매를 중지합니다.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
          <AlertDialogAction onClick={handleStop}>매매 중지</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
