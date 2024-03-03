import { z } from 'zod';
import { BinanceExchangeSchema, BithumbExchangeSchema, UpbitExchangeSchema } from '@/schemas/exchangeSchema.ts';

export type Binance = z.infer<typeof BinanceExchangeSchema>;

export type Bithumb = z.infer<typeof BithumbExchangeSchema>;

export type Upbit = z.infer<typeof UpbitExchangeSchema>;
