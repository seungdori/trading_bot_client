import { checkUserExist } from '@/components/api/desktopClient.ts';
import { useQuery } from '@tanstack/react-query';

export const useCheckUserExist = () => {
  return useQuery({
    queryKey: ['checkUserExist'],
    queryFn: checkUserExist,
  });
};
