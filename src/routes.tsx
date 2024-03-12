import { Navigate, RouteObject } from 'react-router-dom';
import SettingsPage from '@/pages/SettingsPage.tsx';
import TradingPage from '@/pages/TradingPage.tsx';
import AuthLayout from '@/components/auth/AuthLayout.tsx';

type CustomRoute = RouteObject;
export const routes: CustomRoute[] = [
  {
    path: '/',
    element: <Navigate to={'/auth'} replace={true} />,
  },
  {
    path: '/auth',
    element: <AuthLayout />,
  },
  {
    path: '/trading',
    element: <TradingPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
];
