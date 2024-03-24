import { z } from 'zod';
import {
  AssetsSchemaWithKey,
  BinanceExchangeSchema,
  BithumbExchangeSchema,
  ExchangeSchema,
  UpbitExchangeSchema,
  WalletSchema_v2,
} from '@/schemas/exchangeSchema.ts';

export type Binance = z.infer<typeof BinanceExchangeSchema>;

export type Bithumb = z.infer<typeof BithumbExchangeSchema>;

export type Upbit = z.infer<typeof UpbitExchangeSchema>;

export type Exchange = z.infer<typeof ExchangeSchema>;

export type Asset = z.infer<typeof AssetsSchemaWithKey>;

export type Wallet_v2 = z.infer<typeof WalletSchema_v2>;
