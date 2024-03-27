import { useMutation } from '@tanstack/react-query';
import { testFeature } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { Exchange } from '@/types/exchangeTypes.ts';
import { CustomStrategy } from '@/types/backendTypes.ts';

export const useTestFeature = ({ exchange, strategy }: { exchange: Exchange; strategy: CustomStrategy }) => {
  return useMutation({
    mutationKey: ['testFeature', exchange, strategy],
    mutationFn: testFeature,
    onSuccess: (responseDto) => {
      if (responseDto.success) {
        toast({
          title: responseDto.message,
        });
      } else {
        // Todo: display warning or error toast
        toast({
          title: responseDto.message,
        });
      }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
};
