import { z } from 'zod';
import { ExchangeApiKeysSchema } from '@/schemas/settingsSchema.ts';

export type ExchangeApiKeys = z.infer<typeof ExchangeApiKeysSchema>;
