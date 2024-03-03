import { z } from 'zod';
import { ExchangeSchema } from '@/schemas/exchangeSchema.ts';
import { getUpbitWallet } from '@/components/api/upbitClient.ts';
import { getBinaceWallet } from '@/components/api/binanceClient.ts';
import { getBithumbWallet } from '@/components/api/bithumbClient.ts';
import { UpbitWalletSchema } from '@/schemas/upbitSchema.ts';
import { BinanceWalletSchema } from '@/schemas/binanceSchema.ts';
import { BithumbWalletSchema } from '@/schemas/bithumbSchema.ts';

export async function getWallet(
  exchange: z.infer<typeof ExchangeSchema>,
): Promise<
  z.infer<typeof UpbitWalletSchema> | z.infer<typeof BinanceWalletSchema> | z.infer<typeof BithumbWalletSchema>
> {
  switch (exchange) {
    case 'upbit':
      return getUpbitWallet();
    case 'binance':
      return getBinaceWallet(); // Todo: Impl
    case 'bithumb':
      return getBithumbWallet(); // Todo: Impl
    default:
      throw new Error('Invalid exchange');
  }
}
