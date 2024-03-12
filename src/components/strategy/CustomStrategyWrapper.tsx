import { CustomStrategist } from '@/store/strategyStore.ts';
import CustomStrategyTabs from '@/components/strategy/CustomStrategyTabs.tsx';

type Props = { className?: string };

export default function CustomStrategyWrapper({ className }: Props) {
  return (
    <div className={className}>
      <CustomStrategyTabs className="h-full flex flex-col" strategies={CustomStrategist} />;
    </div>
  );
}
