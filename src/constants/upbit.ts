import { z } from 'zod';

export const UPBIT_API_ACCESS_KEY = z
  .string({
    required_error: 'Upbit API access key is required',
    invalid_type_error: 'Upbit API access key must be a string',
  })
  .parse(`VAkx0co5MdTOYWTx5WViT2J3YU4DtvaTpFxwzbII`);

export const UPBIT_API_SECRET_KEY = z
  .string({
    required_error: 'Upbit API secret key is required',
    invalid_type_error: 'Upbit API secret key must be a string',
  })
  .parse(`9fiLxPwcd8zA23t3IlxMU8vHFxcLZbMsgQaziOxS`);

export const UPBIT_REST_API_URL = z
  .string({
    required_error: 'Upbit API URL is required',
    invalid_type_error: 'Upbit API URL must be a string',
  })
  .parse('https://api.upbit.com');
