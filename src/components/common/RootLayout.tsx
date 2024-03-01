import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/common/Navbar.tsx';
import { EXCHANGE } from '@/constants/exchange.ts';

export default function RootLayout() {
  const { pathname } = useLocation();
  const isLoginPage = pathname === '/login';

  return (
    <div className="container w-full h-screen">
      {!isLoginPage && (
        <Navbar
          routes={Object.values(EXCHANGE).map((exchange) => ({
            name: exchange.NAME,
            path: `/trading/${exchange.PATH}`,
          }))}
        />
      )}
      <Outlet />
    </div>
  );
}
