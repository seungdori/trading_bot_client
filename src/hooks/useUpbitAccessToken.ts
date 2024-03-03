import { useQuery } from '@tanstack/react-query';
import { getUpbitAccessToken } from '@/components/api/upbitClient.ts';

export const useUpbitAccessToken = () => {
  return useQuery({
    queryKey: ['upbitAccessToken'],
    queryFn: getUpbitAccessToken,
  });
};
