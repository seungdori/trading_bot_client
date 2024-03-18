import { useMutation } from '@tanstack/react-query';
import { updateTeleramToken } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { Exchange } from '@/types/exchangeTypes.ts';

export const useUpdateTelegramToken = (exchange: Exchange) => {
  return useMutation({
    mutationKey: ['updateTeleramToken', exchange],
    mutationFn: updateTeleramToken,
    onSuccess: (responseDto) => {
      if (responseDto.success) {
        toast({
          title: responseDto.message,
        });
      } else {
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
