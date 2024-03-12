import { useMutation } from '@tanstack/react-query';
import { signup } from '@/components/api/desktopClient';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '@/components/reactQuery/QueryProvider.tsx';
import { toast } from '@/components/ui/use-toast.ts';

export const useSignup = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['signup'],
    mutationFn: signup,
    onSuccess: async (user) => {
      if (user) {
        // Refresh the user check query
        await queryClient.invalidateQueries({
          queryKey: ['checkUserExist'],
        });
        navigate(`/auth`, { replace: true });
        toast({ title: '계정이 생성되었습니다. 생성된 계정으로 로그인해주세요.' });
      }
    },
  });
};
