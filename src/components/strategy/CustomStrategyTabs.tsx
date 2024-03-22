import { CustomStrategist, CustomStrategy } from '@/store/strategyStore.ts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { cn } from '@/lib/utils.ts';
import CustomStrategyContent from '@/components/strategy/CustomStrategyContent.tsx';
import { Button } from '@/components/ui/button.tsx';
import { useStartCustomStrategy } from '@/hooks/useStartCustomStrategy.ts';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';
import { useTestFeature } from '@/hooks/useTestFeature.ts';
import { useStopCustomStrategy } from '@/hooks/useStopCustomStrategy.ts';
import { Icons } from '@/components/common/Icons.tsx';

type Strategies = typeof CustomStrategist;

type Props = {
  strategies: Strategies;
  className?: string;
};

export default function CustomStrategyTabs({ className, strategies }: Props) {
  const { exchange, store, setStore } = useStrategyStore();
  const startMutation = useStartCustomStrategy();
  const stopMutation = useStopCustomStrategy();
  const testMutation = useTestFeature();

  const handleStart = (strategy: CustomStrategy) => {
    // Todo: Add start strategy logic
    console.log('Start', strategy);
    startMutation.mutate({
      exchange,
      store,
    });
  };

  const handleStop = (strategy: CustomStrategy) => {
    // Todo: Add start strategy logic
    console.log('Stop', strategy);
    stopMutation.mutate({
      exchange,
      store,
    });
  };

  const handleTest = (strategy: CustomStrategy) => {
    // Todo: Add start strategy logic
    console.log('Test', strategy);
    testMutation.mutate({
      exchange,
      leverage: exchange === 'binance' ? store.leverage : undefined,
    });
  };

  return (
    <Tabs
      className={className}
      defaultValue={strategies[0]}
      onValueChange={(value) => {
        console.log(`[TAB VALUE CHANGED]`, value);
        setStore({
          customStrategy: value as CustomStrategy,
        });
      }}
    >
      <TabsList className={cn(`grid w-full grid-cols-${strategies.length}`)}>
        {strategies.map((strategy) => (
          <TabsTrigger key={strategy} value={strategy}>
            {strategy}
          </TabsTrigger>
        ))}
      </TabsList>
      {strategies.map((strategy) => (
        <TabsContent key={strategy} className="h-full" value={strategy}>
          <CustomStrategyContent
            className="h-full"
            title={strategy}
            // Todo: Add strategy description
            description={`${strategy} 자동 매매`}
          >
            <Button disabled={startMutation.isPending} onClick={() => handleStart(strategy)}>
              {startMutation.isPending ? <Icons.spinner className="h-4 w-4 animate-spin" /> : <span>Start</span>}
            </Button>
            <Button disabled={stopMutation.isPending} onClick={() => handleStop(strategy)}>
              {stopMutation.isPending ? <Icons.spinner className="h-4 w-4 animate-spin" /> : <span>Stop</span>}
            </Button>
            <Button disabled={testMutation.isPending} onClick={() => handleTest(strategy)}>
              {testMutation.isPending ? <Icons.spinner className="h-4 w-4 animate-spin" /> : <span>Test</span>}
            </Button>
          </CustomStrategyContent>
        </TabsContent>
      ))}
    </Tabs>
  );
}
