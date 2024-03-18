import { useMutation } from '@tanstack/react-query';
import { updateTelegramId } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';

export const useUpdateTelegramId = () => {
  return useMutation({
    mutationKey: ['updateTelegramId'],
    mutationFn: updateTelegramId,
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
