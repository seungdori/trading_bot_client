import { useQuery } from '@tanstack/react-query';
import { backendVersionCheck } from '@/components/api/desktopClient.ts';

export const useBackendVersionCheck = () => {
  return useQuery({
    queryKey: ['backendVersionCheck'],
    queryFn: backendVersionCheck,
    staleTime: Infinity,
  });
};
