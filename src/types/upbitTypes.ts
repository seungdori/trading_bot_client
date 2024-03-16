import { z } from 'zod';
import { UpbitPrivateEndpointErrorResponseSchema, UpbitTickerSchema } from '@/schemas/upbitSchema.ts';

export type UpbitTickersWithKey = Record<string, z.infer<typeof UpbitTickerSchema>>;

export type UpbitPrivateEndpointErrorResponse = z.infer<typeof UpbitPrivateEndpointErrorResponseSchema>;
