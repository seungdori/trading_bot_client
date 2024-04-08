import { z } from 'zod';
import {
  AssetsSchemaWithKey,
  BinanceExchangeSchema,
  okxExchangeSchema,
  BithumbExchangeSchema,
  ExchangeSchema,
  UpbitExchangeSchema,
  WalletSchema,
} from '@/schemas/exchangeSchema.ts';

export type Binance = z.infer<typeof BinanceExchangeSchema>;

export type Bithumb = z.infer<typeof BithumbExchangeSchema>;

export type Upbit = z.infer<typeof UpbitExchangeSchema>;

export type Okx = z.infer<typeof okxExchangeSchema>;

export type Exchange = z.infer<typeof ExchangeSchema>;

export type Asset = z.infer<typeof AssetsSchemaWithKey>;

export type Wallet = z.infer<typeof WalletSchema>;
