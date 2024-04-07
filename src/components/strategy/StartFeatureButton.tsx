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
import { useCheckBotState } from '@/hooks/useCheckBotState.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { useClearBotStateError } from '@/hooks/useClearBotStateError.ts';
import { NEED_AI_SEARCH_FIRST_ERROR_MESSAGE, START_FEATURE_ERROR_METADATA_DETAIL } from '@/constants/error.ts';
import { useEffect } from 'react';
import { BotStateErrorSchema } from '@/schemas/backendSchema.ts';

type Props = { className?: string };

export default function StartFeatureButton({ className }: Props) {
  const { exchange, store } = useStrategyStore();
  const startMutation = useStartCustomStrategy({ exchange, strategy: store.customStrategy });
  const clearErrorMutation = useClearBotStateError({ exchange, ...store });
  const botStateQuery = useCheckBotState({
    exchange,
    customStrategy: store.customStrategy,
    enterStrategy: store.enterStrategy,
  });

  const handleStart = async () => {
    startMutation.mutate({
      exchange,
      store,
    });

    setTimeout(botStateQuery.refetch, 3000);
  };

  useEffect(() => {
    console.log(`[RENDER START FEATURE BUTTON]`);
    const validBackendError = BotStateErrorSchema.safeParse(botStateQuery.data?.error);
    if (validBackendError.success) {
      const backendError = validBackendError.data;

      if (
        backendError.name === 'start_feature_fail' &&
        backendError.meta?.error_detail?.includes(START_FEATURE_ERROR_METADATA_DETAIL)
      ) {
        clearErrorMutation.mutate({ exchange, ...store });
      }

      toast({
        title: '매매 시작에 실패했습니다.',
        description: (
          <div className="whitespace-pre-wrap">
            <p>{NEED_AI_SEARCH_FIRST_ERROR_MESSAGE}</p>
            <span>Error: </span>
            <p className="bold">{backendError.name}</p>
            <p>{backendError.message}</p>
            {backendError.meta && <p>{JSON.stringify(backendError.meta)}</p>}
          </div>
        ),
        duration: 60000,
        variant: 'destructive',
      });
    }
  }, [botStateQuery.data]);

  const isStartFeatureRunning = !!botStateQuery.data?.is_running;

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className={className} disabled={startMutation.isPending || isStartFeatureRunning}>
          {startMutation.isPending || isStartFeatureRunning ? (
            <Icons.spinner className="h-4 w-4 animate-spin" />
          ) : (
            <span>Start</span>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>매매를 시작 하시겠습니까?</AlertDialogTitle>
          <AlertDialogDescription>
            매매 시작 버튼을 누르면 다음 조건으로 자동 매매를 시작합니다:
            <ul className="mt-2 ml-4 list-disc text-sm text-muted-foreground">
              <li>거래소: {exchange}</li>
              <li>전략: {store.customStrategy}</li>
              <li>매매 방향: {store.enterStrategy}</li>
            </ul>
        </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>닫기</AlertDialogCancel>
          <AlertDialogAction onClick={handleStart}>매매 시작</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
