import { z } from 'zod';

export const UPBIT_REST_API_URL = z
  .string({
    required_error: 'Upbit API URL is required',
    invalid_type_error: 'Upbit API URL must be a string',
  })
  .parse('https://api.upbit.com');

export const UPBIT_INVALID_IP_ERROR_MESSAGE = 'no_authorization_ip';

export const UPBIT_INVALID_API_KEY_ERROR_MESSAGE = 'invalid_access_key';

export const UPBIT_INVALID_SECRET_KEY_ERROR_MESSAGE = 'jwt_verification';
