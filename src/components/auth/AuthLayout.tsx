import { useCheckUserExist } from '@/hooks/useCheckUserExist.ts';
import LoginPage from '@/pages/LoginPage';
import SignupPage from '@/pages/SignupPage.tsx';

export default function AuthLayout() {
  const { isLoading, data } = useCheckUserExist();

  // Todo: add loading page
  if (isLoading) {
    return <p>loading...</p>;
  }

  return data?.user_exist ? <LoginPage /> : <SignupPage />;
}
