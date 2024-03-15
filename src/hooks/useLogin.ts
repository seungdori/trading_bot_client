import { login } from '@/components/api/desktopClient.ts';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { DEFAULT_EXCHANGE } from '@/constants/exchange.ts';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: (user) => {
      if (user) {
        navigate(`/trading?exchange=${DEFAULT_EXCHANGE}`, { replace: true });
      }
    },
    onError: (error) => {
      console.error('useLogin error: ', error);
      throw error;
    },
  });
};
