import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { ComponentProps } from 'react';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';

type SliderProps = ComponentProps<typeof Slider>;

const LEVERAGE_STEP = 1;
const MIN_LEVERAGE = 1;
const MAX_LEVERAGE = 125;

export default function LeveragePanel({ className, ...props }: SliderProps) {
  const { exchange, leverage, setLeverage } = useStrategyStore();

  return (
    exchange === 'binance' && (
      <div>
        <p>레버리지 : {leverage}</p>
        <Slider
          value={[leverage]}
          onValueChange={(value) => setLeverage(value[0])}
          min={MIN_LEVERAGE}
          max={MAX_LEVERAGE}
          step={LEVERAGE_STEP}
          className={cn('w-[60%]', className)}
          {...props}
        />
      </div>
    )
  );
}
