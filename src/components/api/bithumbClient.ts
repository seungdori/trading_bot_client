import { z } from 'zod';
import { BithumbWalletSchema } from '@/schemas/bithumbSchema.ts';

export async function getBithumbWallet(): Promise<z.infer<typeof BithumbWalletSchema>> {
  return {
    exchange: 'bithumb',
  };
}
