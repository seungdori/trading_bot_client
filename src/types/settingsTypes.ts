import { z } from 'zod';
import { ExchangeApiKeysSchema, TelegramTokenSchema } from '@/schemas/settingsSchema.ts';

export type ExchangeApiKeys = z.infer<typeof ExchangeApiKeysSchema>;

export type TelegramToken = z.infer<typeof TelegramTokenSchema>;
