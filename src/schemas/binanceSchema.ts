import { z } from 'zod';

/**
 * @example
 * {
 *   "asset": "USDT",
 *   "free": "50300000001.44911105",
 *   "locked": "0",
 *   "freeze": "0",
 *   "withdrawing": "0",
 *   "ipoable": "0",
 *   "btcValuation": "0"
 * }
 */
export const BinanceAssetResponseSchema = z.object({
  asset: z.string(),
  free: z.string(),
  locked: z.string(),
  freeze: z.string(),
  withdrawing: z.string(),
  ipoable: z.string(),
  btcValuation: z.string(),
});

export const BinanceWalletAssetSchema = BinanceAssetResponseSchema.extend({
  key: z.string(),
});

export const BinanceWalletSchema = z.object({
  exchange: z.literal('binance'),
  usdt: BinanceWalletAssetSchema,
  withOutUsdt: BinanceWalletAssetSchema.array(),
});

export const BinanceWebScoketRequestPayloadSchema = z.record(z.any());

export const BinanceWebSocketRequestSchema = z.object({
  id: z.string(),
  method: z.string(),
  params: BinanceWebScoketRequestPayloadSchema.and(
    z.object({
      signature: z.string(),
    }),
  ),
});

export const BinanceTickerSchema = z.object({
  symbol: z.string(),
  price: z.string(),
});
