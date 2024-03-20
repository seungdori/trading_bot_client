import { getVersion } from '@tauri-apps/api/app';
import { useQuery } from '@tanstack/react-query';

export const useAppVersionCheck = () => {
  return useQuery({
    queryKey: ['appVersion'],
    queryFn: getVersion,
    staleTime: Infinity, // Fetch only once
  });
};
