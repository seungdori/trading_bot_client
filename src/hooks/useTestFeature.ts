import { useMutation } from '@tanstack/react-query';
import { testFeature } from '@/components/api/desktopClient.ts';
import { toast } from '@/components/ui/use-toast.ts';

export const useTestFeature = () => {
  return useMutation({
    mutationKey: ['testFeature'],
    mutationFn: testFeature,
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
