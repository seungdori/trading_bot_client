import { useMutation } from '@tanstack/react-query';
import { startCustomStrategy } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { Exchange } from '@/types/exchangeTypes.ts';
import { CustomStrategy } from '@/types/backendTypes.ts';

export const useStartCustomStrategy = ({ exchange, strategy }: { exchange: Exchange; strategy: CustomStrategy }) => {
  return useMutation({
    mutationKey: ['startCustomStrategy', exchange, strategy],
    mutationFn: startCustomStrategy,
    // Todo: refactor backend
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
      toast({
        title: error.message ?? '전략 시작 실패',
      });
      throw new Error(error.message);
    },
  });
};
