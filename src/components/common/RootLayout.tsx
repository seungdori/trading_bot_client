import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/common/Navbar.tsx';
import { EXCHANGE } from '@/constants/exchange.ts';

export default function RootLayout() {
  const { pathname } = useLocation(); // login, 빗썸, settings
  const isLoginPage = pathname === '/login';

  return (
    <div className="container w-full h-screen space-y-4">
      {!isLoginPage && (
        <Navbar
          routes={Object.values(EXCHANGE).map((exchange) => ({
            name: exchange.NAME,
            exchange: exchange.EXCHANGE,
            url: `/trading?exchange=${exchange.EXCHANGE}`,
          }))}
        />
      )}

      {/*Page*/}
      <Outlet />
    </div>
  );
}
