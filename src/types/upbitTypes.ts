import { z } from 'zod';
import { UpbitTickerSchema } from '@/schemas/upbitSchema.ts';

export type UpbitTickersWithKey = Record<string, z.infer<typeof UpbitTickerSchema>>;
