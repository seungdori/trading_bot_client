import { useMutation } from '@tanstack/react-query';
import { createChartImage } from '@/components/api/desktopClient.ts';
import { Exchange } from '@/types/exchangeTypes.ts';
import { toast } from '@/components/ui/use-toast.ts';

export const useCreateChartImage = (exchange: Exchange) => {
  return useMutation({
    mutationKey: ['createChartImage', exchange],
    mutationFn: createChartImage,
    onSuccess: (fileUrl) => {
      console.log(`[LOCAL FILE PATH]`, fileUrl);
    },
    onError: (error) => {
      console.error(error);
      toast({ title: error.name, description: error.message });
      throw error;
    },
  });
};
