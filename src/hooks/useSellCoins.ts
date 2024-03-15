import { Exchange } from '@/types/exchangeTypes.ts';
import { useMutation } from '@tanstack/react-query';
import { sellCoins } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';

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
