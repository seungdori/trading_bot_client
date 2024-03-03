import { z } from 'zod';
import { create } from 'zustand';
import {
  CustomStrategySchema,
  EnterStrategySchema,
  EnterSymbolSchema,
  ExchangeSchema,
} from '@/schemas/exchangeSchema.ts';

type Exchange = z.infer<typeof ExchangeSchema>;
type EnterStrategy = z.infer<typeof EnterStrategySchema>;
type CustomStrategy = z.infer<typeof CustomStrategySchema>;
type Leverage = number;
type EnterSymbol = z.infer<typeof EnterSymbolSchema>;

export type StrategyState = {
  exchange: Exchange;
  leverage: Leverage;
  enterSymbol: EnterSymbol;
  enterStrategy: EnterStrategy;
  customStrategy: CustomStrategy;
  setLeverage: (leverage: Leverage) => void;
  setEnterSymbol: (enterSymbol: EnterSymbol) => void;
  setEnterStrategy: (enterStrategy: EnterStrategy) => void;
  setCustomStrategy: (customStrategy: CustomStrategy) => void;
};

export const useBinanceStrategyStore = create<StrategyState>((set) => ({
  exchange: 'binance',
  leverage: 1,
  enterStrategy: 'long',
  customStrategy: '전략1',
  enterSymbol: { enterSymbolAmount: 10, enterSymbolCount: 500 },
  setLeverage: (leverage) => set({ leverage }),
  setEnterSymbol: (enterSymbol) => set({ enterSymbol }),
  setEnterStrategy: (enterStrategy) => set({ enterStrategy }),
  setCustomStrategy: (customStrategy) => set({ customStrategy }),
}));

export const useBithumbStrategyStore = create<StrategyState>((set) => ({
  exchange: 'bithumb',
  leverage: 1,
  enterStrategy: 'long',
  customStrategy: '전략1',
  enterSymbol: { enterSymbolAmount: 10, enterSymbolCount: 500 },
  setLeverage: (leverage) => set({ leverage }),
  setEnterSymbol: (enterSymbol) => set({ enterSymbol }),
  setEnterStrategy: (enterStrategy) => set({ enterStrategy }),
  setCustomStrategy: (customStrategy) => set({ customStrategy }),
}));

export const useUpbitStrategyStore = create<StrategyState>((set) => ({
  exchange: 'upbit',
  leverage: 1,
  enterStrategy: 'long',
  customStrategy: '전략1',
  enterSymbol: { enterSymbolAmount: 10, enterSymbolCount: 500 },
  setLeverage: (leverage) => set({ leverage }),
  setEnterSymbol: (enterSymbol) => set({ enterSymbol }),
  setEnterStrategy: (enterStrategy) => set({ enterStrategy }),
  setCustomStrategy: (customStrategy) => set({ customStrategy }),
}));
