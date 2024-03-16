import { z } from 'zod';

export const UPBIT_REST_API_URL = z
  .string({
    required_error: 'Upbit API URL is required',
    invalid_type_error: 'Upbit API URL must be a string',
  })
  .parse('https://api.upbit.com');
