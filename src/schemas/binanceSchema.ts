import { z } from 'zod';

export const BinanceWalletSchema = z.object({
  exchange: z.literal('binance'),
});
