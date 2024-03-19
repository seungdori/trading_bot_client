import { Button } from '@/components/ui/button.tsx';
import { Exchange } from '@/types/exchangeTypes.ts';
import { Link } from 'react-router-dom';

type Props = { exchange: Exchange };

export default function AiSearchAssetsButton({ exchange }: Props) {
  return (
    <Button asChild>
      <Link to={`/winRate?exchange=${exchange}`}>AI 탐색 종목</Link>
    </Button>
  );
}
