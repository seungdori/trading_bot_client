import { Button } from '@/components/ui/button.tsx';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card.tsx';
import { LucideMail, LucideSettings, LucidePower } from 'lucide-react';
import { Link } from 'react-router-dom';
import VersionDisplay from '@/components/common/VersionDisplay.tsx';
import { CONTACT_DEVELOPER_EMAIL } from '@/constants/developer.ts';
import { useRestartBackend } from '@/hooks/useBackend.ts';
import { Icons } from '@/components/common/Icons.tsx';
import { toast } from '@/components/ui/use-toast.ts';

export default function SystemSettings() {
  function RestartSystemCoreButton() {
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

    return (
      <Button disabled={restartBackendMutation.isPending} onClick={handleRestart} variant="outline" type="button">
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>System settings</CardTitle>
        <CardDescription>
          <VersionDisplay />
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6">
        {RestartSystemCoreButton()}
        <Button disabled variant="outline" type="button">
          <LucideSettings className="mr-2 h-4 w-4" />
          <span>Reset settings</span>
        </Button>
        <Button variant="outline" type="button" asChild>
          <Link to={`mailto:${CONTACT_DEVELOPER_EMAIL}`} target="_blank" rel="noopener noreferrer">
            <LucideMail className="mr-2 h-4 w-4" /> Contact developer
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
