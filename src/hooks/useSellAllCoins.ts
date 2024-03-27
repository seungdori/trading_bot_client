import { useMutation } from '@tanstack/react-query';
import { sellAllCoins } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { Exchange } from '@/types/exchangeTypes.ts';
import { buildBackendErrorMessage } from '@/helper/error.ts';

export const useSellAllCoins = (exchange: Exchange) => {
  return useMutation({
    mutationKey: ['sellAllCoins', exchange],
    mutationFn: () => sellAllCoins({ exchange }),
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
