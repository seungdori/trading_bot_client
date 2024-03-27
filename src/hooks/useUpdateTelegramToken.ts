import { useMutation } from '@tanstack/react-query';
import { updateTeleramToken } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { Exchange } from '@/types/exchangeTypes.ts';
import { buildBackendErrorMessage } from '@/helper/error.ts';

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
        const errorMessage = buildBackendErrorMessage(responseDto);
        throw new Error(errorMessage);
      }
    },
    onError: (error) => {
      throw error;
    },
  });
};
