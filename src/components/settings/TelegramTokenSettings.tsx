import { Button } from '@/components/ui/button.tsx';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card.tsx';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group.tsx';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Exchange } from '@/types/exchangeTypes.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { toast } from '@/components/ui/use-toast.ts';
import { useEffect, useId } from 'react';
import { BooleanParam, useQueryParam, withDefault } from 'use-query-params';
import { Checkbox } from '@/components/ui/checkbox';
import BinanceLogo from '@/assets/binance.svg';
import BithumbLogo from '@/assets/bithumb.svg';
import UpbitLogo from '@/assets/upbit.svg';
import { TelegramTokenSchema } from '@/schemas/settingsSchema.ts';
import { TelegramToken } from '@/types/settingsTypes.ts';
import { useTelegramStore } from '@/hooks/useTelegramStore.ts';

export default function TelegramTokenSettings() {
  const id = useId();
  const { exchange, setExchange } = useExchangeStore(id);
  const [showTelegramToken, setShowTelegramToken] = useQueryParam(
    'showTelegramToken',
    withDefault(BooleanParam, false),
  );
  const { token, updateToken } = useTelegramStore(exchange);
  const form = useForm<TelegramToken>({
    resolver: zodResolver(TelegramTokenSchema),
    defaultValues: { token },
  });

  const onSubmit = (inputs: TelegramToken) => {
    updateToken(inputs.token);
    toast({ title: 'Telegram token saved!' });
  };

  useEffect(() => {
    form.reset({ token });
  }, [token]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Telegram tokens</CardTitle>
        <CardDescription>Set telegram token.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup
          defaultValue={exchange}
          onValueChange={(selectedValue) => {
            setExchange(selectedValue as Exchange);
          }}
          className="grid grid-cols-3 gap-4"
        >
          <div>
            <RadioGroupItem value="binance" id={`binance-${id}`} className="peer sr-only" />
            <Label
              htmlFor={`binance-${id}`}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <img src={BinanceLogo} className="h-10 m-2" />
              <span>Binance</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="bithumb" id={`bithumb-${id}`} className="peer sr-only" />
            <Label
              htmlFor={`bithumb-${id}`}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <img src={BithumbLogo} className="h-10 m-2" />
              <span>Bithumb</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="upbit" id={`upbit-${id}`} className="peer sr-only" />
            <Label
              htmlFor={`upbit-${id}`}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              {/*<p className="">*/}
              <img src={UpbitLogo} className="h-10 m-2" />
              <span>Upbit</span>
            </Label>
          </div>
        </RadioGroup>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <div className="grid grid-cols-1">
              <FormField
                control={form.control}
                name="token"
                render={({ field }) => (
                  <FormItem className="space-y-3 w-full">
                    <FormLabel>Telegram Token</FormLabel>
                    <FormControl>
                      <Input
                        id="token"
                        type={showTelegramToken ? 'text' : 'password'}
                        placeholder="Telegram Token"
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
              <Checkbox id={`showTelegramToken-${id}`} onCheckedChange={(checked) => setShowTelegramToken(!!checked)} />
              <Label
                htmlFor={`showTelegramToken-${id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show telegram token
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
