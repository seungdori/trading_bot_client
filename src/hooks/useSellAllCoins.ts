import { useMutation } from '@tanstack/react-query';
import { sellAllCoins } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { Exchange } from '@/types/exchangeTypes.ts';

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
