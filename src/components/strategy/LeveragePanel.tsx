import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';
import { ComponentProps, useEffect, useRef, useState } from 'react';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';
import { saveLeverage, useBinanceStateStore } from '@/store/strategyStore.ts';
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button.tsx';

type SliderProps = ComponentProps<typeof Slider>;

const LEVERAGE_STEP = 1;
const MIN_LEVERAGE = 1;
const MAX_LEVERAGE = 125;

export default function LeveragePanel({ className, ...props }: SliderProps) {
  const { store, setStore } = useBinanceStateStore();
  const [leverage, setLeverage] = useState(store.leverage);
  const isLeverageUpdated = store.leverage === leverage;

  const handleApplyLeverage = () => {
    setStore({ leverage });
    saveLeverage(leverage);
  };

  return (
    <div className="w-full h-full flex flex-col justify-around">
      <p>레버리지 : {leverage}</p>
      <Slider
        value={[leverage]}
        onValueChange={(value) => setLeverage(value[0])}
        min={MIN_LEVERAGE}
        max={MAX_LEVERAGE}
        step={LEVERAGE_STEP}
        className={cn('w-full', className)}
        {...props}
      />
      <Button className="w-full" disabled={isLeverageUpdated} onClick={handleApplyLeverage}>
        레버리지 적용
      </Button>
    </div>
  );
}
