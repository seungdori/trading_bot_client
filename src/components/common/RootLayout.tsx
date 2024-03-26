import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '@/components/common/Navbar.tsx';
import { EXCHANGE } from '@/constants/exchange.ts';

const HIDE_NAVBAR_PAGES = ['/', '/healthCheck', '/auth'];

export default function RootLayout() {
  const { pathname } = useLocation();
  const hideNavbar = HIDE_NAVBAR_PAGES.includes(pathname);

  return (
    <div className="container w-full h-screen space-y-4">
      {!hideNavbar && (
        <Navbar
          routes={Object.values(EXCHANGE).map((exchange) => ({
            name: exchange.NAME,
            exchange: exchange.EXCHANGE,
            url: `/trading`,
          }))}
        />
      )}

      {/*Page*/}
      <Outlet />
    </div>
  );
}
