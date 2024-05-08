import { z } from 'zod';
import {
  AssetsSchemaWithKey,
  BinanceExchangeSchema,
  BitgetExchangeSchema,
  OkxExchangeSchema,
  OkxSpotExchangeSchema,
  BinanceSpotExchangeSchema,
  BitgetSpotExchangeSchema,
  BithumbExchangeSchema,
  ExchangeSchema,
  UpbitExchangeSchema,
  WalletSchema,
} from '@/schemas/exchangeSchema.ts';

export type Binance = z.infer<typeof BinanceExchangeSchema>;

export type Bithumb = z.infer<typeof BithumbExchangeSchema>;

export type Upbit = z.infer<typeof UpbitExchangeSchema>;

export type Bitget = z.infer<typeof BitgetExchangeSchema>;

export type Okx = z.infer<typeof OkxExchangeSchema>;

export type OkxSpot = z.infer<typeof OkxSpotExchangeSchema>;

export type BinanceSpot = z.infer<typeof BinanceSpotExchangeSchema>;

export type BitgetSpot = z.infer<typeof BitgetSpotExchangeSchema>;

export type Exchange = z.infer<typeof ExchangeSchema>;

export type Asset = z.infer<typeof AssetsSchemaWithKey>;

export type Wallet = z.infer<typeof WalletSchema>;
