import { z } from 'zod';
import { BinanceWalletSchema } from '@/schemas/binanceSchema.ts';

export async function getBinaceWallet(): Promise<z.infer<typeof BinanceWalletSchema>> {
  return {
    exchange: 'binance',
  };
}
