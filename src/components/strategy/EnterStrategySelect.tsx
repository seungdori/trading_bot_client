import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { RadioGroupItem } from '@/components/ui/radio-group';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';
import { RadioGroup } from '@/components/ui/radio-group.tsx';
import { Button } from '@/components/ui/button.tsx';
import { EnterStrategySchema } from '@/schemas/exchangeSchema.ts';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { useStartAiSearch } from '@/hooks/useStartAiSearch.ts';
import { toast } from '@/components/ui/use-toast.ts';
import { Icons } from '@/components/common/Icons.tsx';
import { useAiSearchProgress } from '@/hooks/useAiSearchProgress.ts';
import AiSearchProgress from '@/components/strategy/AiSearchProgress.tsx';
import { DEFAULT_AI_SEARCH_SYMBOL_COUNT } from '@/constants/exchange.ts';

const FormSchema = z.object({
  type: EnterStrategySchema,
});

type Props = { className?: string };

export default function EnterStrategySelect({ className }: Props) {
  const { exchange, store, setStore } = useStrategyStore();
  const { enterStrategy } = store;
  const aiSearchMutation = useStartAiSearch(exchange);
  const aiSearchProgressQuery = useAiSearchProgress(exchange, enterStrategy);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      type: enterStrategy,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log('[ENTER STRATEGY VALUE]', data);
    toast({
      title: 'AI 탐색을 시작합니다',
      description: '이 작업은 최대 30분이 소요될 수 있습니다.',
    });

    aiSearchMutation.mutate({
      exchange,
      store,
    });
  };

  const isStarted = !!(
    aiSearchProgressQuery.data && aiSearchProgressQuery.data.total_symbol_count !== DEFAULT_AI_SEARCH_SYMBOL_COUNT
  );
  const isProgressing = !!(
    aiSearchMutation.isPending ||
    (aiSearchProgressQuery.data &&
      aiSearchProgressQuery.data.completed_symbol_count !== aiSearchProgressQuery.data.total_symbol_count)
  );

  return (
    <div className={className}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex space-y-6">
          <div className="w-full flex whitespace-nowrap">
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
          <div className="w-full space-y-4">
            <Button disabled={isProgressing} className="w-full" type="submit">
              {isProgressing ? <Icons.spinner className="h-4 w-4 animate-spin" /> : <span>AI 탐색 시작</span>}
            </Button>
            {isStarted && (
              <AiSearchProgress
                className="space-y-4"
                currentProgressSymbol={aiSearchProgressQuery.data.current_progress_symbol}
                completedSymbolCount={aiSearchProgressQuery.data.completed_symbol_count}
                totalSymbolCount={aiSearchProgressQuery.data.total_symbol_count}
              />
            )}
          </div>
        </form>
      </Form>
    </div>
  );
}
