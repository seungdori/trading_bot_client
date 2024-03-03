import { z } from 'zod';

export const TradingDataSchema = z.object({
  long_sl_price: z.number(),
  long_tp1_price: z.number(),
  long_tp2_price: z.number(),
  long_tp3_price: z.number(),
});

export const TradingDataResponseSchema = z.union([TradingDataSchema, z.object({})]);
