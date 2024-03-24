import { useMutation } from '@tanstack/react-query';
import { toast } from '@/components/ui/use-toast.ts';
import { writeText } from '@tauri-apps/api/clipboard';

export const useCopyToClipboard = () => {
  return useMutation({
    mutationFn: writeText,
    mutationKey: ['copyToClipboard'],
    onSuccess: () => {
      toast({ title: 'Copied!', duration: 1000 });
    },
    onError: (error) => {
      if (error) {
        toast({ title: 'Clipboard copy error', description: error.message });
      }
    },
  });
};
