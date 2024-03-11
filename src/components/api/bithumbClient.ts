import { z } from 'zod';
import { BithumbWalletSchema } from '@/schemas/bithumbSchema.ts';
import { BithumbTickersWithKey } from '@/types/bithumbTypes.ts';
import { TickerRequest } from '@/types/exchangeTypes.ts';

export async function getBithumbWallet(): Promise<z.infer<typeof BithumbWalletSchema>> {
  return {
    exchange: 'bithumb',
  };
}

export async function getBithumbTickers({ symbols }: Pick<TickerRequest, 'symbols'>): Promise<BithumbTickersWithKey> {
  return {};
}
