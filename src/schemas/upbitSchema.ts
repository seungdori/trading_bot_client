import { z } from 'zod';

export const UpbitWalletResponseSchema = z.object({
  currency: z.string(),
  balance: z.string(),
  locked: z.string(),
  avg_buy_price: z.string(),
  avg_buy_price_modified: z.boolean(),
  unit_currency: z.string(),
});

export const UpbitWalletAssetSchema = UpbitWalletResponseSchema.extend({
  key: z.string(), // unit_currency - currency (e.g. KRW-BTC)
});

export const UpbitWalletSchema = z.object({
  exchange: z.literal('upbit'),
  krw: UpbitWalletAssetSchema,
  withOutKrw: UpbitWalletAssetSchema.array(),
});

export const UpbitMarketCodeSchema = z.object({
  market: z.string(),
  korean_name: z.string(),
  english_name: z.string(),
});

export const UpbitSocketTickerSchema = z.object({
  type: z.literal('ticker'),
  code: z.string(), // market code e.g. KRW-BTC
  opening_price: z.number(),
  high_price: z.number(),
  low_price: z.number(),
  trade_price: z.number(),
  prev_closing_price: z.number(),
  acc_trade_price: z.number(),
  change: z.string(),
  change_price: z.number(),
  signed_change_price: z.number(),
  change_rate: z.number(),
  signed_change_rate: z.number(),
  ask_bid: z.string(),
  acc_trade_volume: z.number(),
  trade_date: z.string(),
  trade_time: z.string(),
  trade_timestamp: z.number(),
  acc_ask_volume: z.number(),
  acc_bid_volume: z.number(),
  highest_52_week_price: z.number(),
  highest_52_week_date: z.string(),
  lowest_52_week_price: z.number(),
  lowest_52_week_date: z.string(),
  market_state: z.string(),
  is_trading_suspended: z.boolean(),
  delisting_date: z.union([z.date().nullable(), z.string().nullable(), z.any()]), // Toco Check
  market_warning: z.string(),
  timestamp: z.number(),
  acc_trade_price_24h: z.number(),
  acc_trade_volume_24h: z.number(),
  stream_type: z.string(),
});

export const UpbitSocketRequestPayloadSchema = z.object({
  type: z.union([z.literal('ticker'), z.literal('trade'), z.literal('orderbook')]),
  codes: z.string().array(),
  isOnlySnapshot: z.boolean().optional(),
  isOnlyRealtime: z.boolean().optional(),
  format: z.union([z.literal('DEFAULT'), z.literal('SIMPLE')]).optional(),
});

export const UpbitSocketSimpleResponseSchema = z.object({
  ty: z.string(),
  cd: z.string(),
  op: z.number(),
  hp: z.number(),
  lp: z.number(),
  tp: z.number(),
  pcp: z.number(),
  atp: z.number(),
  c: z.string(),
  cp: z.number(),
  scp: z.number(),
  cr: z.number(),
  scr: z.number(),
  ab: z.string(),
  tv: z.number(),
  atv: z.number(),
  tdt: z.string(),
  ttm: z.string(),
  ttms: z.number(),
  aav: z.number(),
  abv: z.number(),
  h52wp: z.number(),
  h52wdt: z.string(),
  l52wp: z.number(),
  l52wdt: z.string(),
  ts: z.null(),
  ms: z.string(),
  msfi: z.null(),
  its: z.boolean(),
  dd: z.null(),
  mw: z.string(),
  tms: z.number(),
  atp24h: z.number(),
  atv24h: z.number(),
  st: z.string(),
});
