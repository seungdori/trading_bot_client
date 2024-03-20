import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button.tsx';
import { Icons } from '../common/Icons';
import { Label } from '@/components/ui/label.tsx';
import { Input } from '@/components/ui/input.tsx';
import { LucideMail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { z } from 'zod';
import { SignupSchema } from '@/schemas/backendSchema.ts';
import { useForm } from 'react-hook-form';
import { useSignup } from '@/hooks/useSignupUser.ts';
import { CONTACT_DEVELOPER_EMAIL } from '@/constants/developer.ts';

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

type SignupFormInput = z.infer<typeof SignupSchema>;

export function SignupForm({ className, ...props }: UserAuthFormProps) {
  const signupMutation = useSignup();
  const { register, handleSubmit } = useForm<SignupFormInput>({
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit((data) => {
    console.log(`[SignupForm] data`, data);
    signupMutation.mutate(data);
  });

  return (
    <div className={className} {...props}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">Sign up</h1>
        <p className="text-sm text-muted-foreground">Enter your ID and Password to continue.</p>
      </div>
      <div className={cn('grid gap-6 mt-2', className)} {...props}>
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
                disabled={signupMutation.isPending}
              />
            </div>
            <div className="grid gap-1">
              <Label className="sr-only" htmlFor="username">
                password
              </Label>
              <Input
                {...register('password')}
                id="password"
                placeholder="Password"
                type="password"
                autoCapitalize="none"
                autoCorrect="off"
                disabled={signupMutation.isPending}
              />
            </div>
            <Button type="submit" disabled={signupMutation.isPending}>
              {signupMutation.isPending && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
              Sign up
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
        <Button variant="outline" type="button" disabled={signupMutation.isPending} asChild>
          <Link to={`mailto:${CONTACT_DEVELOPER_EMAIL}`} target="_blank" rel="noopener noreferrer">
            <LucideMail className="mr-2 h-4 w-4" /> Contact
          </Link>
        </Button>
      </div>
    </div>
  );
}
