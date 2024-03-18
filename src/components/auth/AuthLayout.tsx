import { useCheckUserExist } from '@/hooks/useCheckUserExist.ts';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage.tsx';
import { useInitExchangeApiKeys } from '@/hooks/useApiKeysStore.ts';
import { useEffect } from 'react';
import { useTelegramInit } from '@/hooks/useTelegramInit.ts';

export default function AuthLayout() {
  const { isLoading, data } = useCheckUserExist();
  const apiKeyInitMutation = useInitExchangeApiKeys();
  const telegramInitMutation = useTelegramInit();

  useEffect(() => {
    apiKeyInitMutation.mutate();
    telegramInitMutation.mutate();
  }, []);

  // Todo: add loading page
  if (isLoading) {
    return <p>loading...</p>;
  }

  return data?.user_exist ? <LoginPage /> : <SignupPage />;
}
