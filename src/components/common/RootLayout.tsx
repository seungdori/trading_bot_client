import { Outlet } from 'react-router-dom';
import NavbarUI from '@/components/common/Navbar.tsx';
import { EXCHANGE } from '@/constants/exchange.ts';

export default function RootLayout() {
  return (
    <main className="h-screen">
      <NavbarUI
        routes={Object.values(EXCHANGE).map((exchange) => ({
          name: exchange.NAME,
          path: `/trading/${exchange.PATH}`,
        }))}
      />
      <Outlet />
    </main>
  );
}
