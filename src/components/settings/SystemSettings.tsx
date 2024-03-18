import { Button } from '@/components/ui/button.tsx';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card.tsx';
import { LucideMail, LucideSettings, LucidePower } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function SystemSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>System settings</CardTitle>
        <CardDescription>Set system settings.</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 gap-6">
        <Button disabled variant="outline" type="button">
          <LucidePower className="mr-2 h-4 w-4" />
          <span>Restart trading system core</span>
        </Button>
        <Button disabled variant="outline" type="button">
          <LucideSettings className="mr-2 h-4 w-4" />
          <span>Reset settings</span>
        </Button>
        <Button variant="outline" type="button" asChild>
          <Link to="mailto:contact@wildcoder.me" target="_blank" rel="noopener noreferrer">
            <LucideMail className="mr-2 h-4 w-4" /> Contact developer
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
