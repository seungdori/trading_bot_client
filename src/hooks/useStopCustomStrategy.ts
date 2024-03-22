import { useMutation } from '@tanstack/react-query';
import { stopCustomStrategy } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';

export const useStopCustomStrategy = () => {
  return useMutation({
    mutationKey: ['stopCustomStrategy'],
    mutationFn: stopCustomStrategy,
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
          description: (responseDto.meta?.error as string) ?? '전략 중지 실패',
        });
      }
    },
    onError: (error) => {
      toast({
        title: error.name,
        description: error.message ?? '전략 중지 실패',
      });
      throw new Error(error.message);
    },
  });
};
