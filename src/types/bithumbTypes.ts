import { z } from 'zod';
import { BithumbTickerSchema } from '@/schemas/bithumbSchema.ts';

export type BithumbTickersWithKey = Record<string, z.infer<typeof BithumbTickerSchema>>;
