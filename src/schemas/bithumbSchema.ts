import { z } from 'zod';

export const BithumbWalletSchema = z.object({
  exchange: z.literal('bithumb'),
  krw: z.string(),
});

export const BithumbTickerSchema = z.record(z.any());
