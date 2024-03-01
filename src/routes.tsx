import React from 'react';
import { Navigate, RouteObject } from 'react-router-dom';
import App from '@/App.tsx';
import { EXCHANGE } from '@/constants/exchange.ts';
import SettingsPage from '@/pages/SettingsPage.tsx';

type CustomRoute = RouteObject;
export const routes: CustomRoute[] = [
  {
    path: '/',
    element: <Navigate to={`/trading/${EXCHANGE.BINANCE.PATH}`} replace={true} />,
  },
  {
    path: '/trading/:exchange',
    element: <App />,
  },
  {
    path: '/settings',
    element: <SettingsPage />,
  },
];
