/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CsRlPpF1Enj
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardFooter, Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils.ts';

type Props = {
  title: string;
  description: string;
  children?: React.ReactNode;
  className?: string;
};

export default function WalletCard({ title, description, children, className }: Props) {
  return (
    <Card className={cn('w-full', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {children}
      <CardFooter>
        <Button className="w-full">history</Button>
      </CardFooter>
    </Card>
  );
}
