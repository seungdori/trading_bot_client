import { z } from 'zod';

export const BITHUMB_REST_API_URL = z
  .string({
    required_error: 'Bithumb API URL is required',
    invalid_type_error: 'Bithumb API URL must be a string',
  })
  .parse('https://api.bithumb.com');

export const BITHUMB_INVALID_API_KEY_ERROR_CODE = '5300';

export const BITHUMB_INVALID_IP_ERROR_CODE = '5302';
