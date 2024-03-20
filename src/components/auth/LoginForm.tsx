import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button.tsx';
import { Icons } from '../common/Icons';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { LucideMail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLogin } from '@/hooks/useLogin.ts';
import { useForm } from 'react-hook-form';
import { LoginSchema } from '@/schemas/backendSchema.ts';
import { z } from 'zod';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

type LoginFormInput = z.infer<typeof LoginSchema>;

export function LoginForm({ className, ...props }: UserAuthFormProps) {
  const loginMutation = useLogin();
  const { register, handleSubmit } = useForm<LoginFormInput>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(`[LoginForm] data`, data);
    loginMutation.mutate(data);
  });

  return (
    <div className={className} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
        <p className="text-sm text-muted-foreground">Enter your ID and Password to continue.</p>
      </div>
      <div className={cn('grid gap-6 mt-2')}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-2">
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="username">
                username
              </Label>
              <Input
                {...register('username')}
                id="username"
                placeholder="ID"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={loginMutation.isPending}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="password">
                password
              </Label>
              <Input
                {...register('password')}
                id="password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={loginMutation.isPending}
              />
            </div>
            <Button type="submit" disabled={loginMutation.isPending}>
              {loginMutation.isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
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
        <Button variant="outline" type="button" disabled={loginMutation.isPending} asChild>
          <Link to="mailto:skyfish93@naver.com" target="_blank" rel="noopener noreferrer">
            <LucideMail className="mr-2 h-4 w-4" /> Contact
          </Link>
        </Button>
      </div>
    </div>
  );
}
