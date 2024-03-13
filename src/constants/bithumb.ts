import { z } from 'zod';

export const BITHUMB_API_ACCESS_KEY = z.string({
  required_error: 'Bithumb API access key is required',
  invalid_type_error: 'Bithumb API access key must be a string',
});

export const BITHUMB_API_SECRET_KEY = z.string({
  required_error: 'Bithumb API secret key is required',
  invalid_type_error: 'Bithumb API secret key must be a string',
});

export const BITHUMB_REST_API_URL = z
  .string({
    required_error: 'Bithumb API URL is required',
    invalid_type_error: 'Bithumb API URL must be a string',
  })
  .parse('https://api.bithumb.com');
