import { z } from 'zod';

export const BINANCE_API_BASE_URL = z
  .string({
    required_error: 'Binance API URL is required',
    invalid_type_error: 'Binance API URL must be a string',
  })
  .parse('https://api.binance.com');

export const BINANCE_INVALID_IP_ERROR_CODE = -2015;
