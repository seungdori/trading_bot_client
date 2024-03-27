import { useMutation } from '@tanstack/react-query';
import { updateTelegramId } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { buildBackendErrorMessage } from '@/helper/error.ts';

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
        const errorMessage = buildBackendErrorMessage(responseDto);
        throw new Error(errorMessage);
      }
    },
    onError: (error) => {
      throw error;
    },
  });
};
