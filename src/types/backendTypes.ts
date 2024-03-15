import {
  BinancePositionsResponseSchema,
  BithumbPositionsResponseSchema,
  FetchPositionsRequestSchema,
  PositionsResponseSchema,
  SellAllCoinsRequestSchema,
  SellCoinSchema,
  SellCoinsRequestSchema,
  StartFeatureRequestSchema,
  StopFeatureRequestSchema,
  TestFeatureRequestSchema,
  UpbitPositionsResponseSchema,
  UserWithoutPasswordSchema,
} from '@/schemas/backendSchema.ts';
import { z } from 'zod';

type ResponseDtoSuccess<T> = {
  success: true;
  message: string;
  meta: Record<string, unknown>;
  data: T;
};

type ResponseDtoFailure = {
  success: false;
  message: string;
  meta: Record<string, unknown>;
  data?: unknown;
};

export type ResponseDto<T> = ResponseDtoSuccess<T> | ResponseDtoFailure;

export type BinancePositionsResponse = z.infer<typeof BinancePositionsResponseSchema>;

export type UpbitPositionsResponse = z.infer<typeof UpbitPositionsResponseSchema>;

export type BithumbPositionsResponse = z.infer<typeof BithumbPositionsResponseSchema>;

export type PositionsResponse = z.infer<typeof PositionsResponseSchema>;

export type User = z.infer<typeof UserWithoutPasswordSchema>;

export type FetchPositionsRequest = z.infer<typeof FetchPositionsRequestSchema>;

export type StartFeatureRequest = z.infer<typeof StartFeatureRequestSchema>;

export type StopFeatureRequest = z.infer<typeof StopFeatureRequestSchema>;

export type TestFeatureRequest = z.infer<typeof TestFeatureRequestSchema>;

export type SellAllCoinsRequest = z.infer<typeof SellAllCoinsRequestSchema>;

export type SellCoin = z.infer<typeof SellCoinSchema>;

export type SellCoinsRequest = z.infer<typeof SellCoinsRequestSchema>;
