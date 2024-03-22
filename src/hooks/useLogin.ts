import { login } from '@/components/api/desktopClient.ts';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/components/ui/use-toast.ts';
import { EXCHANGE } from '@/constants/exchange.ts';

export const useLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationKey: ['login'],
    mutationFn: login,
    onSuccess: (responseDto) => {
      if (responseDto.success) {
        navigate(`/trading?exchange=${EXCHANGE.BINANCE.EXCHANGE}`, { replace: true });
      } else {
        toast({ title: '로그인 실패', description: responseDto.message });
      }
    },
    onError: (error) => {
      console.error('useLogin error: ', error);
      throw error;
    },
  });
};
