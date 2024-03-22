import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { ReactNode } from 'react';

const PREV_PAGE = -1;

type Props = { className?: string; children: ReactNode };
export default function BackButton({ className, children }: Props) {
  const navigate = useNavigate();

  const handleBackClicked = () => navigate(PREV_PAGE);

  return (
    <Button className={className} onClick={handleBackClicked}>
      {children}
    </Button>
  );
}
