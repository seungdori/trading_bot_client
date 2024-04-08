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
import okxLogo from '@/assets/okx.svg';
import { ExchangeApiKeysSchema } from '@/schemas/settingsSchema.ts';
import { useApiKeysStore } from '@/hooks/useApiKeysStore.ts';
import { ExchangeApiKeys } from '@/types/settingsTypes.ts';
import { cn } from '@/lib/utils.ts';

type Props = { className?: string };

export default function ApiKeysSettings({ className }: Props) {
  const id = useId();
  const { exchange, setExchange } = useExchangeStore(id);
  const onApiKeyUpdateFail = (message: string) => {
    toast({ title: 'Failed to update credentials', description: <p className="whitespace-pre-wrapp">{message}</p> });
  };
  const [showApiKeys, setShowApiKeys] = useQueryParam('showApiKeys', withDefault(BooleanParam, false));
  const {
    keys: { apiKey, secret, password },
    updateApiKeys,
  } = useApiKeysStore(exchange, onApiKeyUpdateFail);
  const form = useForm<ExchangeApiKeys>({
    resolver: zodResolver(ExchangeApiKeysSchema),
    defaultValues: { apiKey, secret, password },
  });

  const onSubmit = (inputs: ExchangeApiKeys) => {
    updateApiKeys(inputs);
    toast({ title: 'Credentials saved!' });
  };

  useEffect(() => {
    form.reset({ apiKey, secret, password });
  }, [apiKey, secret, password]);

  const passwordRequired = exchange === 'okx';
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Exchange api keys</CardTitle>
        <CardDescription>Set exchange api key & api secret</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <RadioGroup
          defaultValue={exchange}
          onValueChange={(selectedValue) => setExchange(selectedValue as Exchange)}
          className="grid grid-cols-4 gap-4"
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
              <img src={UpbitLogo} className="h-10 m-2" />
              <span>Upbit</span>
            </Label>
          </div>
          <div>
            <RadioGroupItem value="okx" id={`okx-${id}`} className="peer sr-only" />
            <Label
              htmlFor={`okx-${id}`}
              className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
            >
              <img src={okxLogo} className="h-10 m-2" />
              <span>Okx</span>
            </Label>
          </div>
        </RadioGroup>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
            <div className="grid grid-cols-3 gap-2">
              <FormField
                control={form.control}
                name="apiKey"
                render={({ field }) => (
                  <FormItem className="space-y-3 w-full">
                    <FormLabel>API KEY</FormLabel>
                    <FormControl>
                      <Input
                        id="apiKey"
                        type={showApiKeys ? 'text' : 'password'}
                        placeholder="API KEY"
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
              <FormField
                control={form.control}
                name="secret"
                render={({ field }) => (
                  <FormItem className="space-y-3 w-full">
                    <Label htmlFor="secret">API SECRET</Label>
                    <FormControl>
                      <Input
                        id="secret"
                        type={showApiKeys ? 'text' : 'password'}
                        placeholder="API SECRET"
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
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="space-y-3 w-full">
                    <Label htmlFor="password">PASSWORD</Label>
                    <FormControl>
                      <Input
                        id="password"
                        type={showApiKeys ? 'text' : 'password'}
                        placeholder="PASSWORD"
                        autoCapitalize="none"
                        autoCorrect="off"
                        disabled={!passwordRequired}
                        value={field.value ?? ''}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id={`showApiKeys-${id}`} onCheckedChange={(checked) => setShowApiKeys(!!checked)} />
              <Label
                htmlFor={`showApiKeys-${id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Show api keys
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
