import { Button } from '@/components/ui/button.tsx';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card.tsx';
import { LucideMail, LucideSettings } from 'lucide-react';
import { Link } from 'react-router-dom';
import VersionDisplay from '@/components/common/VersionDisplay.tsx';
import { CONTACT_DEVELOPER_EMAIL } from '@/constants/developer.ts';
import RestartSystemCoreButton from '@/components/settings/RestartSystemCoreButton.tsx';
import { cn } from '@/lib/utils.ts';

type Props = { className?: string };

export default function SystemSettings({ className }: Props) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>System settings</CardTitle>
        <CardDescription>
          <VersionDisplay />
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6">
        <RestartSystemCoreButton />
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
