'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button.tsx';
import { Icons } from '../common/Icons';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { LucideMail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { mockLogin } from '@/components/api/DesktopClient.tsx';
import { EXCHANGE } from '@/constants/exchange.ts';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const isLoggedIn = mockLogin({ username: 'mock', password: 'mock' });
      if (isLoggedIn) {
        navigate(`/trading/${EXCHANGE.BINANCE.PATH}`, { replace: true });
      }
    }, 3000);
  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              username
            </Label>
            <Input id="username" placeholder="ID" autoCapitalize="none" autoCorrect="off" disabled={isLoading} />
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="username">
              username
            </Label>
            <Input
              id="username"
              placeholder="Password"
              type="password"
              autoCapitalize="none"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
            Login
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or contact to developer</span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} asChild>
        <Link to="mailto:contact@wildcoder.me" target="_blank" rel="noopener noreferrer">
          <LucideMail className="mr-2 h-4 w-4" /> Contact
        </Link>
      </Button>
    </div>
  );
}
