import { z } from 'zod';

export const BinanceExchangeSchema = z.literal('binance');

export const BithumbExchangeSchema = z.literal('bithumb');

export const UpbitExchangeSchema = z.literal('upbit');

export const bitgetExchangeSchema = z.literal('bitget');

export const okxExchangeSchema = z.literal('okx');

export const ExchangeSchema = z.union([
  BinanceExchangeSchema,
  BithumbExchangeSchema,
  UpbitExchangeSchema,
  bitgetExchangeSchema,
  okxExchangeSchema,
]);

export const EnterStrategySchema = z.union([z.literal('long'), z.literal('short'), z.literal('long-short')]);

export const CustomStrategySchema = z.union([z.literal('트랜드'), z.literal('그리드'), z.literal('전략3')]);

export const EnterSymbolSchema = z.object({
  enterSymbolCount: z.number(),
  enterSymbolAmount: z.number(),
});

export const AssetsSchema = z.object({
  coinName: z.string(),
  initPrice: z.number(),
  currentPrice: z.number(),
  amount: z.string(),
  rateOfReturn: z.number(),
  sellPrice: z.string(),
  tp1: z.string(),
  tp2: z.string(),
  tp3: z.string(),
  value: z.number(),
});

export const AssetsSchemaWithKey = AssetsSchema.extend({
  key: z.string(),
});

export const WalletSchema = z.object({
  exchange: ExchangeSchema,
  totalBalance: z.number(),
  walletBalance: z.number().nullish(),
  totalUnrealizedProfit: z.number().nullish(),
});
