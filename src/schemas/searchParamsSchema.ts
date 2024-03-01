import { z } from 'zod';
import { ExchangeSchema } from '@/schemas/exchangeSchema.ts';

export const TradingSearchParamsSchema = z.object({
  exchange: ExchangeSchema,
});
