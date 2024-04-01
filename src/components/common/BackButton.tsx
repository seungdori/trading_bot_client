import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { ReactNode } from 'react';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';
import { usePrevUrlStore } from '@/store/prevUrlStore.ts';

type Props = { className?: string; children: ReactNode };
export default function BackButton({ className, children }: Props) {
  const navigate = useNavigate();
  const { getPrevUrl } = usePrevUrlStore();
  const { exchange } = useStrategyStore();
  const path = getPrevUrl() ?? `/trading?exchange=${exchange}`;

  const handleBackClicked = () => navigate(path);

  return (
    <Button className={className} onClick={handleBackClicked}>
      {children}
    </Button>
  );
}
