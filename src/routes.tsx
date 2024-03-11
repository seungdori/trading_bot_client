import { Navigate, RouteObject } from 'react-router-dom';
import SettingsPage from '@/pages/SettingsPage.tsx';
import AuthPage from '@/pages/AuthPage.tsx';
import TradingPage from '@/pages/TradingPage.tsx';
// import AuthenticationPage from '@/pages/AuthPage.tsx';

type CustomRoute = RouteObject;
export const routes: CustomRoute[] = [
  {
    path: '/',
    element: <Navigate to={'/login'} replace={true} />,
  },
  {
    path: '/login',
    element: <AuthPage />,
    // element: <AuthenticationPage />,
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
