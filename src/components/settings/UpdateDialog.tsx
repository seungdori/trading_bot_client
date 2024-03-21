import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast.ts';
import { installUpdate } from '@tauri-apps/api/updater';
import { relaunch } from '@tauri-apps/api/process';
import { useStopServer } from '@/hooks/useBackend.ts';

type Props = {
  version?: string;
  description?: string;
};

export default function UpdateDialog({ version, description }: Props) {
  const navigate = useNavigate();

  const startInstall = () => {
    toast({
      title: '업데이트 중',
      description: `업데이트가 완료되면 재시작됩니다.`,
      draggable: false,
      duration: Infinity,
    });
    installUpdate().then(relaunch);
  };

  const stopServer = useStopServer({ onSuccess: startInstall });

  const handleUpdate = () => stopServer.mutate();

  const handleSkip = () => navigate('/healthCheck', { replace: true });

  return (
    <AlertDialog defaultOpen>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>새로운 업데이트가 있습니다. v{version}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleSkip}>Skip</AlertDialogCancel>
          <AlertDialogAction onClick={handleUpdate}>Update</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
