import { z } from 'zod';
import { BinanceTickerSchema } from '@/schemas/binanceSchema.ts';

export type BinanceTickersWithKey = Record<string, z.infer<typeof BinanceTickerSchema>>;
