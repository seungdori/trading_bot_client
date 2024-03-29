import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs.tsx';
import { cn } from '@/lib/utils.ts';
import CustomStrategyContent from '@/components/strategy/CustomStrategyContent.tsx';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';
import StartFeatureButton from '@/components/strategy/StartFeatureButton.tsx';
import StopFeatureButton from '@/components/strategy/StopFeatureButton.tsx';
import TestFeatureButton from '@/components/strategy/TestFeatureButton.tsx';
import { CustomStrategist } from '@/constants/backend.ts';
import { CustomStrategy } from '@/types/backendTypes.ts';

type Strategies = typeof CustomStrategist;

type Props = {
  strategies: Strategies;
  className?: string;
};

export default function CustomStrategyTabs({ className, strategies }: Props) {
  const { setStore } = useStrategyStore();

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
      {/*Todo: Fix*/}
      <TabsList className={cn(`grid w-full grid-cols-${strategies.length + 1}`)}>
        {/*<TabsList className={cn(`grid w-full grid-cols-${4}`)}>*/}
        {strategies.map((strategy) => (
          <TabsTrigger key={strategy} value={strategy} className="col-span-1">
            <span>{strategy}</span>
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
            <StartFeatureButton className="w-full" />
            <StopFeatureButton className="w-full" />
            <TestFeatureButton className="w-full" />
          </CustomStrategyContent>
        </TabsContent>
      ))}
    </Tabs>
  );
}
