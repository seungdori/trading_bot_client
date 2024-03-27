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
import { DEFAULT_AI_SEARCH_CURRENT_SYMBOL, DEFAULT_AI_SEARCH_SYMBOL_COUNT } from '@/constants/exchange.ts';
import { useAiSearchStatusStore } from '@/store/progressStore.ts';
import { useEffect } from 'react';

const FormSchema = z.object({
  type: EnterStrategySchema,
});

type Props = { className?: string };

export default function EnterStrategySelect({ className }: Props) {
  const { exchange, store, setStore } = useStrategyStore();
  const { enterStrategy } = store;
  const aiSearchMutation = useStartAiSearch(exchange);
  const aiSearchProgressQuery = useAiSearchProgress(exchange, enterStrategy);
  const aiSearchStatusStore = useAiSearchStatusStore({ exchange, store });
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
    aiSearchStatusStore.setStatus('started');
  };

  // Synchronize the component state with the initial search status from local storage
  useEffect(() => {
    const isProgressing = (currentSymbol: string) => currentSymbol !== DEFAULT_AI_SEARCH_CURRENT_SYMBOL;
    const isCompleted = (totalSymbolCount: number, completedSymbolCount: number) =>
      totalSymbolCount === completedSymbolCount && totalSymbolCount !== DEFAULT_AI_SEARCH_SYMBOL_COUNT;

    const syncStatusWithServer = () => {
      if (!aiSearchProgressQuery.data) {
        return;
      }

      if (isProgressing(aiSearchProgressQuery.data.current_progress_symbol)) {
        if (
          isCompleted(aiSearchProgressQuery.data.total_symbol_count, aiSearchProgressQuery.data.completed_symbol_count)
        ) {
          aiSearchStatusStore.setStatus('completed');
          return;
        } else {
          aiSearchStatusStore.setStatus('progressing');
          return;
        }
      }
    };

    syncStatusWithServer();
  }, [aiSearchProgressQuery.data, aiSearchStatusStore]);

  const disableShortPosition = exchange === 'bithumb' || exchange === 'upbit'; // Todo: Impl
  const isSearchButtonActive = aiSearchStatusStore.status === 'started' || aiSearchStatusStore.status === 'progressing';
  const isSearchCompleted = aiSearchStatusStore.status === 'completed';

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
                          <RadioGroupItem value="short" disabled={disableShortPosition} />
                        </FormControl>
                        <FormLabel className="font-normal">숏 진입전략</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="long-short" disabled={disableShortPosition} />
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
          {!aiSearchProgressQuery.isError && (
            <div className="w-full space-y-4">
              <Button disabled={isSearchButtonActive || isSearchCompleted} className="w-full" type="submit">
                {isSearchButtonActive ? <Icons.spinner className="h-4 w-4 animate-spin" /> : <span>AI 탐색 시작</span>}
              </Button>
              {aiSearchStatusStore.status === 'started' && (
                <div className="flex flex-col items-center">
                  <p className="text-xs">잠시후 진행 현황이 표시됩니다.</p>
                </div>
              )}
              {aiSearchStatusStore.status === 'progressing' && aiSearchProgressQuery.data && (
                <AiSearchProgress
                  className="space-y-4"
                  currentProgressSymbol={aiSearchProgressQuery.data.current_progress_symbol}
                  completedSymbolCount={aiSearchProgressQuery.data.completed_symbol_count}
                  totalSymbolCount={aiSearchProgressQuery.data.total_symbol_count}
                />
              )}
            </div>
          )}
        </form>
      </Form>
    </div>
  );
}
