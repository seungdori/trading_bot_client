import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from '@/components/common/ThemeProvider.tsx';
import { Toaster } from '@/components/ui/toaster';
import RootLayout from '@/components/common/RootLayout.tsx';
import { routes } from '@/routes.tsx';
import QueryProvider from '@/components/reactQuery/QueryProvider.tsx';
import { ReactRouter6Adapter } from 'use-query-params/adapters/react-router-6';
import { QueryParamProvider } from 'use-query-params';
import './global.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <QueryParamProvider adapter={ReactRouter6Adapter}>
        <RootLayout />
      </QueryParamProvider>
    ),
    children: routes,
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <QueryProvider>
    <ThemeProvider>
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  </QueryProvider>,
);
