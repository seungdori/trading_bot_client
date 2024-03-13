import { z } from 'zod';

export const ExchangeApiKeysSchema = z.object({
  apiKey: z.string(),
  secret: z.string(),
});
