import { Icons } from '@/components/common/Icons.tsx';
import { useEffect } from 'react';
import { onUpdaterEvent } from '@tauri-apps/api/updater';
import { toast } from '@/components/ui/use-toast.ts';
import { ToastAction } from '@/components/ui/toast.tsx';
import { useNavigate } from 'react-router-dom';
import { useCheckUpdate } from '@/hooks/useCheckUpdate.ts';
import UpdateDialog from '@/components/settings/UpdateDialog.tsx';
import { clearAiSearchStatus } from '@/store/progressStore.ts';

export default function InitPage() {
  const navigate = useNavigate();
  const updateCheckQuery = useCheckUpdate();

  const handleSkip = () => navigate('/healthCheck', { replace: true });

  useEffect(() => {
    clearAiSearchStatus();

    const unlistenPromise = onUpdaterEvent(({ error, status }) => {
      // This will log all updater events, including status updates and errors.
      console.log('Updater event', error, status);

      if (status === 'ERROR') {
        console.error(`[USE UPDATER] Updater error: `, error);
        toast({
          title: '업데이트 중 오류가 발생했습니다.',
          description: error,
          duration: Infinity,
          draggable: false,
          action: (
            <ToastAction altText="Update app" onClick={handleSkip}>
              로그인 화면으로 이동
            </ToastAction>
          ),
        });
      }
    });

    return () => {
      unlistenPromise.then((unlisten) => unlisten());
    };
  }, []);

  if (updateCheckQuery.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        <p className="mt-4 text-lg font-bold">Checking update...</p>
      </div>
    );
  }

  if (updateCheckQuery.data && !updateCheckQuery.data.shouldUpdate) {
    handleSkip();
  }

  return (
    <>
      {updateCheckQuery.data?.shouldUpdate ? (
        <UpdateDialog
          version={updateCheckQuery.data.manifest?.version}
          description={updateCheckQuery.data.manifest?.body}
        />
      ) : null}
      <div className="flex flex-col items-center justify-center h-full">
        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
        <p className="mt-4 text-lg font-bold">업데이트중...</p>
        <p className="font-semibold">업데이트가 완료될때까지 프로그램을 종료하지 마세요.</p>
        <p className="font-semibold">업데이트가 완료되면 자동 재시작됩니다.</p>
      </div>
    </>
  );
}
