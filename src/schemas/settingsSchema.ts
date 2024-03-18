import { z } from 'zod';

export const ExchangeApiKeysSchema = z.object({
  apiKey: z.string(),
  secret: z.string(),
});

export const TelegramTokenSchema = z.object({
  token: z.string(),
});
