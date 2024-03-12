import { z } from 'zod';

export const ApiKeysSchema = z.object({
  apiKey: z.string(),
  secret: z.string(),
});
