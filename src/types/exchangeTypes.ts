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

export type BinanceWallet = z.infer<typeof BinanceWalletSchema>;

export type UpbitWallet = z.infer<typeof UpbitWalletSchema>;

export type BithumbWallet = z.infer<typeof BithumbWalletSchema>;

export type Wallet = BinanceWallet | UpbitWallet | BithumbWallet;

export type TickerRequest = { wallet?: Wallet; symbols: string[] };

export type TickersWithKey = UpbitTickersWithKey | BinanceTickersWithKey | BithumbTickersWithKey;
