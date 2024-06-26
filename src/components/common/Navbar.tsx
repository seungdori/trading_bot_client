/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/n8PxBcPbryx
 */
import { createSearchParams, NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import SettingsGroup from '@/components/settings/SettingsGroup';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';

export type NavbarRouteProps = {
  url: string;
  name: string;
  exchange: string;
};

type NavbarProps = {
  className?: string;
  routes: NavbarRouteProps[];
};

export default function Navbar({ routes, className }: NavbarProps) {
  const {
    exchange,
    store: { enterStrategy, customStrategy },
  } = useStrategyStore();
  const searchParams = createSearchParams({ enterStrategy, customStrategy }).toString();

  return (
    <header className={cn('flex h-16 w-full items-center justify-between border-b', className)}>
      <nav className="w-full flex justify-between">
        <ul className="flex space-x-12">
          {routes.map((route) => (
            <li key={route.exchange} className="whitespace-nowrap items-center w-full flex">
              <NavLink
                to={{
                  pathname: route.url,
                  search: `?exchange=${route.exchange}&${searchParams}`,
                }}
                className={({ isActive, isPending }) =>
                  isPending
                    ? 'font-bold text-purple-500'
                    : isActive && exchange === route.exchange
                      ? 'font-bold text-red-500'
                      : 'font-bold text-bg-primary'
                }
              >
                {route.name}
              </NavLink>
            </li>
          ))}
        </ul>
        <SettingsGroup className="grid grid-cols-2 items-center space-x-2 p-4" />
      </nav>
    </header>
  );
}
