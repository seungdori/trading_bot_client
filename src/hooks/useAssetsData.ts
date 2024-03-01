import { useParams } from 'react-router-dom';
import { getAssetsData } from '@/components/api/DesktopClient.tsx';
import { useQuery } from '@tanstack/react-query';
import { TradingSearchParamsSchema } from '@/schemas/searchParamsSchema.ts';

const ASSETS_FETCH_INTERVAL_MS = 10000;

export const useAssetsData = () => {
  const params = useParams();
  const { exchange } = TradingSearchParamsSchema.parse(params);

  return useQuery({
    queryKey: ['assetsData', exchange],
    queryFn: getAssetsData,
    refetchInterval: ASSETS_FETCH_INTERVAL_MS,
  });
};
