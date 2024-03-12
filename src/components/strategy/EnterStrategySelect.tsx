import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { toast } from '@/components/ui/use-toast';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';
import { RadioGroup } from '@/components/ui/radio-group.tsx';
import { Button } from '@/components/ui/button.tsx';
import { startAiSearch } from '@/components/api/desktopClient.ts';
import { EnterStrategySchema } from '@/schemas/exchangeSchema.ts';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';

const FormSchema = z.object({
  type: EnterStrategySchema,
});

type Props = { className?: string };

export default function EnterStrategySelect({ className }: Props) {
  const { exchange, store, setStore } = useStrategyStore();
  const { enterStrategy } = store;
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: enterStrategy,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('[ENTER STRATEGY VALUE]', enterStrategy);

    await startAiSearch({ exchange, store });
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-y-6">
          <div className="w-full flex">
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>진입 전략</FormLabel>
                  <FormControl>
                    <RadioGroup
                      value={enterStrategy}
                      onValueChange={(value) => {
                        setStore({
                          enterStrategy: value as z.infer<typeof EnterStrategySchema>,
                        });
                        field.onChange(value);
                      }}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="long" />
                        </FormControl>
                        <FormLabel className="font-normal">롱 진입전략</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="short" disabled={exchange !== 'binance'} />
                        </FormControl>
                        <FormLabel className="font-normal">숏 진입전략</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="long-short" disabled={exchange !== 'binance'} />
                        </FormControl>
                        <FormLabel className="font-normal">롱/숏 진입전략</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button className="w-full" type="submit">
            AI 탐색 시작
          </Button>
        </form>
      </Form>
    </div>
  );
}
