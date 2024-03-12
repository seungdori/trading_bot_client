import { z } from 'zod';
import { ApiKeysSchema } from '@/schemas/settingsSchema.ts';

export type ApiKeys = z.infer<typeof ApiKeysSchema>;
