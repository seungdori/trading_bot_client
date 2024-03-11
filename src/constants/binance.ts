import { z } from 'zod';

export const BINANCE_API_ACCESS_KEY = z
  .string({
    required_error: 'Binance API access key is required',
    invalid_type_error: 'Binance API access key must be a string',
  })
  .parse('TYk6qbBDLCJExSLevd2O3AS458hLeXqnE7MHEpGwFD65LrcCUDqiOMdZOzw4gaWj');

export const BINANCE_API_SECRET_KEY = z
  .string({
    required_error: 'Binance API secret key is required',
    invalid_type_error: 'Binance API secret key must be a string',
  })
  .parse('u45KSiwsM7Y6XViYLG95cg3pR4OKu3vloXqYiTHJSqG29Quqc4imJ9FxwDDoSpka');

export const BINANCE_API_BASE_URL = z
  .string({
    required_error: 'Binance API URL is required',
    invalid_type_error: 'Binance API URL must be a string',
  })
  .parse('https://api.binance.com');

export const BINANCE_API_WEBSOCKET_BASE_URL = z
  .string({
    required_error: 'Binance API websocket URL is required',
    invalid_type_error: 'Binance API websocket URL must be a string',
  })
  .parse('wss://ws-api.binance.com:443/ws-api/v3');
