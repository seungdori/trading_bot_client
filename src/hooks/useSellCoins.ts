import { Exchange } from '@/types/exchangeTypes.ts';
import { useMutation } from '@tanstack/react-query';
import { sellCoins } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { buildBackendErrorMessage } from '@/helper/error.ts';

export const useSellCoins = (exchange: Exchange) => {
  return useMutation({
    mutationKey: ['sellCoins', exchange],
    mutationFn: sellCoins,
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
