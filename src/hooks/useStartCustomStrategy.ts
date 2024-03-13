import { useMutation } from '@tanstack/react-query';
import { startCustomStrategy, stopCustomStrategy } from '@/components/api/desktopClient.ts';
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
      throw new Error(error.message);
    },
  });
};

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
        });
      }
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
};
