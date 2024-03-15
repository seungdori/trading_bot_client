import { useMutation } from '@tanstack/react-query';
import { testFeature } from '@/components/api/desktopClient.ts';

export const useTestFeature = () => {
  return useMutation({
    mutationKey: ['testFeature'],
    mutationFn: testFeature,
  });
};
