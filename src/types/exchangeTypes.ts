import { z } from 'zod';
import {
  BinanceExchangeSchema,
  BithumbExchangeSchema,
  ExchangeSchema,
  UpbitExchangeSchema,
} from '@/schemas/exchangeSchema.ts';
import { UpbitWalletSchema } from '@/schemas/upbitSchema.ts';
import { BinanceWalletSchema } from '@/schemas/binanceSchema.ts';
import { BithumbWalletSchema } from '@/schemas/bithumbSchema.ts';
import { UpbitTickersWithKey } from '@/types/upbitTypes.ts';
import { BithumbTickersWithKey } from '@/types/bithumbTypes.ts';
import { BinanceTickersWithKey } from '@/types/binanceTypes.ts';

export type Binance = z.infer<typeof BinanceExchangeSchema>;

export type Bithumb = z.infer<typeof BithumbExchangeSchema>;

export type Upbit = z.infer<typeof UpbitExchangeSchema>;

export type Exchange = z.infer<typeof ExchangeSchema>;

export type Wallet =
  | z.infer<typeof BinanceWalletSchema>
  | z.infer<typeof UpbitWalletSchema>
  | z.infer<typeof BithumbWalletSchema>;

export type TickerRequest = { wallet?: Wallet; symbols: string[] };

export type TickersWithKey = UpbitTickersWithKey | BinanceTickersWithKey | BithumbTickersWithKey;
