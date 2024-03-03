import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/components/ThemeProvider.tsx';
import { Toaster } from '@/components/ui/toaster';
import RootLayout from '@/components/common/RootLayout.tsx';
import { routes } from '@/routes.tsx';
import QueryProvider from '@/components/reactQuery/QueryProvider.tsx';
import './global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: routes,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
        <Toaster />
      </ThemeProvider>
    </QueryProvider>
  </React.StrictMode>,
);
