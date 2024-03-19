import { open } from '@tauri-apps/api/shell';
import { useMutation } from '@tanstack/react-query';
import { createChartImage } from '@/components/api/desktopClient.ts';
import { Exchange } from '@/types/exchangeTypes.ts';
import { toast } from '@/components/ui/use-toast.ts';

export const useCreateChartImage = (exchange: Exchange) => {
  return useMutation({
    mutationKey: ['createChartImage', exchange],
    mutationFn: createChartImage,
    onSuccess: async (responseDto) => {
      if (responseDto.success) {
        const fileUrl = responseDto.data;
        toast({
          title: `${responseDto.message}\n${fileUrl}에 파일 생성.`,
        });
        console.log(`[FILE URL]`, fileUrl);
        return await open(fileUrl);
      } else {
        toast({
          title: responseDto.message,
        });
      }
    },
    onError: (error) => {
      console.error(error);
      toast({ title: error.name, description: error.message });
      throw error;
    },
  });
};
