import { Button } from '@/components/ui/button.tsx';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card.tsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useExchangeStore } from '@/store/exchangeStore.ts';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { toast } from '@/components/ui/use-toast.ts';
import { useEffect, useId } from 'react';
import { BooleanParam, useQueryParam, withDefault } from 'use-query-params';
import { Checkbox } from '@/components/ui/checkbox';
import TelegramLogo from '@/assets/telegram.svg';
import { useTelegramStore } from '@/hooks/useTelegramStore.ts';
import { z } from 'zod';

export const TelegramIdSchema = z.object({
  telegramId: z.string(),
});

export type TelegramId = z.infer<typeof TelegramIdSchema>;

export default function TelegramIdSettings() {
  const id = useId();
  const { exchange } = useExchangeStore(id);
  const [showTelegramId, setShowTelegramId] = useQueryParam('showTelegramId', withDefault(BooleanParam, false));
  const { telegramId, updateId } = useTelegramStore(exchange);
  const form = useForm<TelegramId>({
    resolver: zodResolver(TelegramIdSchema),
    defaultValues: { telegramId },
  });

  const onSubmit = (inputs: TelegramId) => {
    updateId(inputs.telegramId);
    toast({ title: 'Telegram token saved!' });
  };

  useEffect(() => {
    form.reset({ telegramId });
  }, [telegramId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Telegram id settings</CardTitle>
        <CardDescription>Set telegram id.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup disabled className="grid grid-cols-1">
          <div>
            <RadioGroupItem defaultChecked value="telegram" id="telegram" className="peer sr-only" />
            <Label
              htmlFor="telegram"
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <img src={TelegramLogo} className="h-10 m-2" />
              <span>Telegram</span>
            </Label>
          </div>
        </RadioGroup>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <div className="grid grid-cols-1 gap-4">
              <FormField
                control={form.control}
                name="telegramId"
                render={({ field }) => (
                  <FormItem className="space-y-3 w-full">
                    <FormLabel>Telegram ID</FormLabel>
                    <FormControl>
                      <Input
                        id="telegramId"
                        type={showTelegramId ? 'text' : 'password'}
                        placeholder="Telegram ID"
                        autoCapitalize="none"
                        autoCorrect="off"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id={`showTelegramId-${id}`} onCheckedChange={(checked) => setShowTelegramId(!!checked)} />
              <Label
                htmlFor={`showTelegramId-${id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show telegram ID
              </Label>
            </div>
            <Button type="submit" className="w-full">
              Save
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
