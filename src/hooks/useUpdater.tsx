import { useEffect } from 'react';
import { checkUpdate, installUpdate, onUpdaterEvent } from '@tauri-apps/api/updater';
import { toast } from '@/components/ui/use-toast.ts';
import { ToastAction } from '@/components/ui/toast.tsx';
import { relaunch } from '@tauri-apps/api/process';
import { useNavigate } from 'react-router-dom';
import { useStopServer } from '@/hooks/useBackend.ts';

export const useUpdater = () => {
  console.log(`[USE UPDATER] useUpdater hook`);
  const navigate = useNavigate();

  // Updater integration
  const startInstall = () => {
    toast({
      title: '업데이트 중',
      description: `업데이트가 완료되면 재시작됩니다.`,
      duration: Infinity,
    });
    installUpdate().then(relaunch);
  };

  const stopServer = useStopServer({ onSuccess: startInstall });

  const handleUpdate = () => stopServer.mutate();

  const handleSkip = () => navigate('/healthCheck', { replace: true });

  useEffect(() => {
    const unlistenPromise = onUpdaterEvent(({ error, status }) => {
      // This will log all updater events, including status updates and errors.
      console.log('Updater event', error, status);

      if (status === 'ERROR') {
        console.error(`[USE UPDATER] Updater error: `, error);
        toast({
          title: '업데이트 중 오류가 발생했습니다.',
          description: error,
          duration: Infinity,
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

  // Update checker
  useEffect(() => {
    checkUpdate().then(({ shouldUpdate, manifest }) => {
      console.log(`[USE UPDATER] checkUpdate: `, shouldUpdate, manifest);
      if (!shouldUpdate || !manifest) {
        return;
      }

      const { version, body } = manifest;
      toast({
        title: `새로운 업데이트가 있습니다. v${version}`,
        description: body,
        action: (
          <div className="flex flex-col gap-2">
            <ToastAction altText="Update app" onClick={handleUpdate}>
              Update
            </ToastAction>
            <ToastAction altText="Update app" onClick={handleSkip}>
              Skip
            </ToastAction>
          </div>
        ),
      });
    });
  }, []);
};
