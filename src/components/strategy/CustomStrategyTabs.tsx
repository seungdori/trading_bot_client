import { CustomStrategist } from '@/store/strategyStore.ts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { cn } from '@/lib/utils.ts';
import CustomStrategyContent from '@/components/strategy/CustomStrategyContent.tsx';
import { Button } from '@/components/ui/button.tsx';

type Strategies = typeof CustomStrategist;

type Strategy = Strategies[number];

type Props = {
  strategies: Strategies;
  className?: string;
};

export default function CustomStrategyTabs({ className, strategies }: Props) {
  const handleStart = (strategy: Strategy) => {
    // Todo: Add start strategy logic
    console.log('Start', strategy);
  };

  const handleStop = (strategy: Strategy) => {
    // Todo: Add start strategy logic
    console.log('Stop', strategy);
  };

  const handleTest = (strategy: Strategy) => {
    // Todo: Add start strategy logic
    console.log('Test', strategy);
  };

  return (
    <Tabs className={className} defaultValue={strategies[0]}>
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
            <Button onClick={() => handleStart(strategy)}>Start</Button>
            <Button onClick={() => handleStop(strategy)}>Stop</Button>
            <Button onClick={() => handleTest(strategy)}>Test</Button>
          </CustomStrategyContent>
        </TabsContent>
      ))}
    </Tabs>
  );
}
