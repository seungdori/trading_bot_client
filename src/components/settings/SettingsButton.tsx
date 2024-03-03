import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { SettingsIcon } from 'lucide-react';

export default function SettingsButton() {
  return (
    <Button asChild size="icon" variant="outline">
      <Link to="/settings">
        <SettingsIcon className="h-[1.2rem] w-[1.2rem]" />
      </Link>
    </Button>
  );
}
