import { z } from 'zod';

export const DESKTOP_BACKEND_BASE_URL = 'http://localhost:8000';

export const UserExistSchema = z.object({
  user_exist: z.boolean(),
});

export const UserSchema = z.object({
  id: z.number(),
  username: z.string(),
  password: z.string(),
});

export const UserWithoutPasswordSchema = UserSchema.omit({ password: true });

export const SignupSchema = UserSchema.pick({ username: true, password: true });

export const LoginSchema = UserSchema.pick({ username: true, password: true });

export const TradingDataSchema = z.object({
  symbol: z.string(),
  long_sl_price: z.number(),
  long_tp1_price: z.number(),
  long_tp2_price: z.number(),
  long_tp3_price: z.number(),
});

export const TradingDataResponseSchema = TradingDataSchema;

export const BinancePositionsResponseSchema = z.object({
  symbol: z.string(),
  entry_price: z.number(),
  quantity: z.number(),
  mark_price: z.number(),
  value: z.number(),
  profit_percent: z.number(),
  trading_data: z.any().nullish(),
});

export const UpbitPositionsResponseSchema = z.object({
  currency: z.string(),
  current_price: z.number(),
  balance: z.string(),
  avg_buy_price: z.string(),
  trading_data: z.any().nullish(),
});

export const BithumbPositionsResponseSchema = z.object({
  currency: z.string(),
  current_price: z.number(),
  balance: z.string(),
  trading_data: z.any().nullish(),
});

export const PositionsResponseSchema = z.union([
  BinancePositionsResponseSchema,
  UpbitPositionsResponseSchema,
  BithumbPositionsResponseSchema,
]);
