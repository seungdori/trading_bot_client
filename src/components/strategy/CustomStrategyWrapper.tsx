import CustomStrategyTabs from '@/components/strategy/CustomStrategyTabs.tsx';
import { CustomStrategist } from '@/constants/backend.ts';

type Props = { className?: string };

export default function CustomStrategyWrapper({ className }: Props) {
  return (
    <div className={className}>
      <CustomStrategyTabs className="w-full h-full flex flex-col" strategies={CustomStrategist} />
    </div>
  );
}
