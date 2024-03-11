import { useMutation } from '@tanstack/react-query';
import { signup } from '@/components/api/desktopClient';
import { useNavigate } from 'react-router-dom';
import { EXCHANGE } from '@/constants/exchange.ts';
import { queryClient } from '@/components/reactQuery/QueryProvider.tsx';

export const useSignup = () => {
  return useMutation({
    mutationKey: ['signup'],
    mutationFn: signup,
    onSuccess: async (user) => {
      const navigate = useNavigate();
      if (user) {
        navigate(`/trading/${EXCHANGE.BINANCE.EXCHANGE}`, { replace: true });
        // Refresh the user check query
        await queryClient.invalidateQueries({
          queryKey: ['checkUserExist'],
        });
      }
    },
  });
};
