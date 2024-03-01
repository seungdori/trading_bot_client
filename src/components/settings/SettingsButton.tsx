import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';

type Props = { className?: string };
export default function SettingsButton({ className }: Props) {
  return (
    <Button asChild>
      <Link to="/settings">설정 페이지</Link>
    </Button>
  );
}
