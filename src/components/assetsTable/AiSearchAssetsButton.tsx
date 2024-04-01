import { Button } from '@/components/ui/button.tsx';
import { createSearchParams, useNavigate } from 'react-router-dom';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';
import { usePrevUrlStore } from '@/store/prevUrlStore.ts';

export default function AiSearchAssetsButton() {
  const navigate = useNavigate();
  const {
    exchange,
    store: { enterStrategy, customStrategy },
  } = useStrategyStore();
  const { key, buildCurrentUrl } = usePrevUrlStore();

  const handleBackClicked = () => {
    const currentUrl = buildCurrentUrl();
    const params = {
      exchange,
      enterStrategy,
      customStrategy,
      [key]: currentUrl,
    };

    navigate({
      pathname: '/winRate',
      search: `?${createSearchParams(params)}`,
    });
  };

  return <Button onClick={handleBackClicked}>AI 탐색 종목</Button>;
}
