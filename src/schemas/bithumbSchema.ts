import { z } from 'zod';

export const BithumbWalletSchema = z.object({
  exchange: z.literal('bithumb'),
});
