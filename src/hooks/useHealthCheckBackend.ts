import { useQuery } from '@tanstack/react-query';
import { healthCheck } from '@/components/api/desktopClient.ts';

export const useHealthCheckBackend = () => {
  return useQuery({
    queryKey: ['healthCheck'],
    queryFn: healthCheck,
    refetchInterval: 1000,
  });
};
