import { z } from 'zod';
import { EnterStrategySchema, ExchangeSchema } from '@/schemas/exchangeSchema.ts';

export const DESKTOP_BACKEND_BASE_URL = 'http://localhost:8000';

export const DESKTOP_BACKEND_WS_URL = 'ws://localhost:8000';

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
});

export const UpbitPositionsResponseSchema = z.object({
  currency: z.string(),
  current_price: z.number(),
  balance: z.string(),
  avg_buy_price: z.string(),
});

export const BithumbPositionsResponseSchema = z.object({
  currency: z.string(),
  current_price: z.number(),
  balance: z.string(),
});

// Todo: Impl
export const BitgetPositionsResponseSchema = z.object({
  currency: z.string(),
  current_price: z.number(),
  balance: z.string(),
});

export const PositionsResponseSchema = z.union([
  BinancePositionsResponseSchema,
  UpbitPositionsResponseSchema,
  BithumbPositionsResponseSchema,
  BitgetPositionsResponseSchema,
]);

export const ExchangeApiKeyRequestSchema = z.object({
  exchange_name: z.string(),
  api_key: z.string(),
  secret_key: z.string(),
});

export const StartAiSearchRequestSchema = z.object({
  exchange_name: ExchangeSchema,
  enter_strategy: z.string(),
});

export const StartFeatureRequestSchema = z.object({
  exchange_name: ExchangeSchema,
  custom_strategy: z.string(),
  enter_strategy: z.string(),
  enter_symbol_count: z.number(),
  enter_symbol_amount: z.number(),
  leverage: z.number().optional(),
});

export const StopFeatureRequestSchema = StartFeatureRequestSchema.pick({
  exchange_name: true,
  custom_strategy: true,
  enter_strategy: true,
});

export const TestFeatureRequestSchema = z.object({
  exchange_name: ExchangeSchema,
  leverage: z.number().optional(),
});

export const SellAllCoinsRequestSchema = z.object({
  exchange_name: ExchangeSchema,
});

export const SellCoinSchema = z.object({
  symbol: z.string(),
  // amount: z.number(),
});

export const SellCoinsRequestSchema = z.object({
  exchange_name: ExchangeSchema,
  coins: SellCoinSchema.array(),
});

export const TelegramTokenRequestSchema = z.object({
  exchange_name: z.string(),
  token: z.string(),
});

export const WinRateSchema = z.object({
  name: z.string(),
  long_win_rate: z.number(),
  short_win_rate: z.number(),
  total_win_rate: z.number(),
});

export const AiSearchProgressResponseSchema = z.object({
  exchange_name: ExchangeSchema,
  enter_strategy: EnterStrategySchema,
  current_progress_symbol: z.string(),
  completed_symbol_count: z.number(),
  total_symbol_count: z.number(),
});

export const WalletResponseSchema = z.object({
  exchange_name: ExchangeSchema,
  total_balance: z.number(),
  wallet_balance: z.number().nullish(),
  total_unrealized_profit: z.number().nullish(),
});

export const TradingErrorName = z.union([
  z.literal('start_feature_fail'),
  z.literal('stop_feature_fail'),
  z.literal('test_feature_fail'),
]);

export const BotStateErrorSchema = z.object({
  name: TradingErrorName,
  message: z.string(),
  meta: z.record(z.string()).nullish(),
});

export const BotKeyStateSchema = z.object({
  exchange_name: z.string(),
  enter_strategy: z.string(),
  custom_strategy: z.string(),
});

export const BotStateSchema = BotKeyStateSchema.extend({
  key: z.string(),
  is_running: z.boolean(),
  error: BotStateErrorSchema.nullable(),
});
