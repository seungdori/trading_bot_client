import { useMutation } from '@tanstack/react-query';
import { startCustomStrategy } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';

export const useStartCustomStrategy = () => {
  return useMutation({
    mutationKey: ['startCustomStrategy'],
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
