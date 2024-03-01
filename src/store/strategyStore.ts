import { create } from 'zustand';
import { z } from 'zod';
import { CustomStrategySchema, EnterStrategySchema, ExchangeSchema } from '@/schemas/exchangeSchema.ts';

type Exchange = z.infer<typeof ExchangeSchema>;
type EnterStrategy = z.infer<typeof EnterStrategySchema>;
type CustomStrategy = z.infer<typeof CustomStrategySchema>;
type StrategyState = {
  exchange: Exchange;
  enterStrategy: EnterStrategy;
  customStrategy: CustomStrategy;
  setEnterStrategy: (enterStrategy: EnterStrategy) => void;
  setCustomStrategy: (customStrategy: CustomStrategy) => void;
};

export const useBinanceStrategyStore = create<StrategyState>((set) => ({
  exchange: 'binance',
  enterStrategy: 'long',
  customStrategy: '전략1',
  setEnterStrategy: (enterStrategy) => set({ enterStrategy }),
  setCustomStrategy: (customStrategy) => set({ customStrategy }),
}));

export const useBithumbStrategyStore = create<StrategyState>((set) => ({
  exchange: 'bithumb',
  enterStrategy: 'long',
  customStrategy: '전략1',
  setEnterStrategy: (enterStrategy) => set({ enterStrategy }),
  setCustomStrategy: (customStrategy) => set({ customStrategy }),
}));

export const useUpbitStrategyStore = create<StrategyState>((set) => ({
  exchange: 'upbit',
  enterStrategy: 'long',
  customStrategy: '전략1',
  setEnterStrategy: (enterStrategy) => set({ enterStrategy }),
  setCustomStrategy: (customStrategy) => set({ customStrategy }),
}));
