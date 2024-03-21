import { useQuery } from '@tanstack/react-query';
import { checkUpdate } from '@tauri-apps/api/updater';

export const useCheckUpdate = () => {
  return useQuery({
    queryKey: ['checkUpdate'],
    queryFn: checkUpdate,
    staleTime: Infinity,
  });
};
