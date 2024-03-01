import { Navigate, RouteObject } from 'react-router-dom';
import SettingsPage from '@/pages/SettingsPage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import TradingPage from '@/pages/TradingPage.tsx';

type CustomRoute = RouteObject;
export const routes: CustomRoute[] = [
  {
    path: '/',
    element: <Navigate to={`/login`} replace={true} />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/trading/:exchange',
    element: <TradingPage />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
];
