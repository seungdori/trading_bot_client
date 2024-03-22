import { useMutation } from '@tanstack/react-query';
import { startAiSearch } from '@/components/api/desktopClient.ts';
import { Exchange } from '@/types/exchangeTypes.ts';
import { toast } from '@/components/ui/use-toast.ts';

export const useStartAiSearch = (exchange: Exchange) => {
  return useMutation({
    mutationKey: ['startAiSearch', exchange],
    mutationFn: startAiSearch,
    onSuccess: (responseDto) => {
      if (responseDto.success) {
        toast({
          title: 'AI 탐색 성공',
          description: responseDto.message,
        });
      } else {
        // Todo: display warning or error toast
        toast({
          title: 'AI 탐색 실패',
          description: responseDto.message,
          variant: 'destructive',
        });
      }
    },
    onError: (error) => {
      toast({
        title: 'AI 탐색 실패',
        description: error.message,
        variant: 'destructive',
      });
      throw new Error(error.message);
    },
  });
};
