import { RouteObject } from 'react-router-dom';
import TradingPage from '@/pages/TradingPage.tsx';
import AuthLayout from '@/components/auth/AuthLayout.tsx';
import InitPage from '@/pages/InitPage.tsx';
import WinRatePage from '@/pages/WinRatePage.tsx';
import SettingsPage from '@/pages/SettingsPage.tsx';

type CustomRoute = RouteObject;
export const routes: CustomRoute[] = [
  {
    path: '/',
    element: <InitPage />,
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
  {
    path: '/winRate',
    element: <WinRatePage />,
  },
];
