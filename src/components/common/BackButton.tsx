import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';
import { ReactNode } from 'react';
import { useExchangeStore } from '@/store/exchangeStore.ts';

type Props = { className?: string; children: ReactNode };
export default function BackButton({ className, children }: Props) {
  const navigate = useNavigate();
  const { exchange } = useExchangeStore();

  const handleBackClicked = () => navigate(`/trading?exchange=${exchange}`);

  return (
    <Button className={className} onClick={handleBackClicked}>
      {children}
    </Button>
  );
}
