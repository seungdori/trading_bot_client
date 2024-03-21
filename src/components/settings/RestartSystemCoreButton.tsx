import { useRestartBackend } from '@/hooks/useBackend.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { Button } from '@/components/ui/button.tsx';
import { Icons } from '@/components/common/Icons.tsx';
import { LucidePower } from 'lucide-react';

export default function RestartSystemCoreButton() {
  const restartBackendMutation = useRestartBackend();

  const handleRestart = () => {
    if (confirm('Are you sure you want to restart the trading system core?')) {
      restartBackendMutation.mutate();
    }
  };

  if (restartBackendMutation.isError) {
    toast({
      title: `Error`,
      description: 'Trading core restarted failed',
      variant: 'destructive',
    });
  }

  if (restartBackendMutation.isSuccess) {
    toast({
      title: `Success`,
      description: 'Trading core restarted successfully',
    });
  }

  // Todo: Handle disable status after rust side impl done.
  return (
    <Button disabled onClick={handleRestart} variant="outline" type="button">
      {restartBackendMutation.isPending ? (
        <Icons.spinner className="h-4 w-4 animate-spin" />
      ) : (
        <>
          <LucidePower className="mr-2 h-4 w-4" />
          <span>Restart trading system core</span>
        </>
      )}
    </Button>
  );
}
