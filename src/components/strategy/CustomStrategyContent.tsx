import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { cn } from '@/lib/utils.ts';

type Props = {
  title: string;
  description: string;
  className?: string;
  children: React.ReactNode;
};

export default function CustomStrategyContent({ className, title, description, children }: Props) {
  return (
    <Card className={cn('flex flex-col', className)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-full flex flex-col space-y-2 justify-evenly">{children}</CardContent>
    </Card>
  );
}
