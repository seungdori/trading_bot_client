import { z } from 'zod';
import { Body, fetch } from '@tauri-apps/api/http';
import { getnerateRandomTransactionLog } from '@/helper/typia/generated/mock.ts';
import { TradingSearchParamsSchema } from '@/schemas/searchParamsSchema.ts';
import { ExchangeStateStore } from '@/store/strategyStore.ts';
import { Upbit, Wallet } from '@/types/exchangeTypes.ts';
import {
  DESKTOP_BACKEND_BASE_URL,
  TradingDataResponseSchema,
  UserExistSchema,
  LoginSchema,
  SignupSchema,
} from '@/schemas/backendSchema.ts';
import { PositionsResponse, ResponseDto, UpbitPositionsResponse, User } from '@/types/backendTypes.ts';
import { BINANCE_API_ACCESS_KEY, BINANCE_API_BASE_URL } from '@/constants/binance.ts';
import { createBinanceQueryString, createBinanceSignature } from '@/components/api/binanceClient.ts';
import { BinanceAssetResponseSchema } from '@/schemas/binanceSchema.ts';

export async function checkUserExist(): Promise<z.infer<typeof UserExistSchema>> {
  const endpoint = new URL('/user/exist', DESKTOP_BACKEND_BASE_URL);
  try {
    const response = await fetch<ResponseDto<z.infer<typeof UserExistSchema>>>(endpoint.href, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });

    const responseDto = response.data;

    if (responseDto.success) {
      return responseDto.data;
    } else {
      throw new Error(responseDto.message);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function signup(args: z.infer<typeof SignupSchema>): Promise<User> {
  const endpoint = new URL('/auth/signup', DESKTOP_BACKEND_BASE_URL);

  try {
    const response = await fetch<ResponseDto<User>>(endpoint.href, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: Body.json(args),
    });

    const responseDto = response.data;

    if (responseDto.success) {
      return responseDto.data;
    } else {
      throw new Error(responseDto.message);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function login(args: z.infer<typeof LoginSchema>) {
  const endpoint = new URL('/auth/login', DESKTOP_BACKEND_BASE_URL);

  try {
    const response = await fetch<ResponseDto<User>>(endpoint.href, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: Body.json(args),
    });

    const responseDto = response.data;

    if (responseDto.success) {
      return responseDto.data;
    } else {
      throw new Error(responseDto.message);
    }
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export function mockLogin({ username, password }: { username: string; password: string }) {
  console.log(`[mockLogin] username, password`, username, password);
  return true;
}

export async function getTransactionLog(exchange: z.infer<typeof TradingSearchParamsSchema>['exchange']) {
  try {
    const endpoint = new URL('/sapi/v3/asset/getUserAsset', BINANCE_API_BASE_URL);
    const timestamp = Date.now();
    const recvWindow = 60000;
    const payload: Record<string, any> = {
      timestamp,
      recvWindow,
    };

    const queryString = createBinanceQueryString(payload);
    const signature = await createBinanceSignature(payload);
    const url = endpoint.href + '?' + queryString + '&signature=' + signature;

    const response = await fetch<z.infer<typeof BinanceAssetResponseSchema>[]>(url, {
      method: 'POST',
      headers: {
        'X-MBX-APIKEY': BINANCE_API_ACCESS_KEY,
        'Content-Type': 'application/xxx-www-form-urlencoded',
      },
    });
    console.log(`[BINANCE WALLET]`, response.data);
  } catch (e) {
    console.error(`[FETCH BINANCE WALLET ERROR]`, e);
  }

  // Todo: fetch data from server
  console.log(exchange);
  return getnerateRandomTransactionLog();
}

export async function startAiSearch({ exchange, store }: Pick<ExchangeStateStore, 'exchange' | 'store'>) {
  console.log(`[startAiSearch] exchange, enterStrategy`, exchange, store.enterStrategy);
  return true;
}

/**
 * @description Fetch trading data from Upbit
 * @param exchange - 'upbit'
 * @param symbols - e.g. ['KRW-BTC', 'KRW-ETH', 'KRW-DOGE']
 */
export async function fetchUpbitTradingData(
  exchange: Upbit,
  symbols: UpbitPositionsResponse['currency'][],
): Promise<z.infer<typeof TradingDataResponseSchema>[]> {
  // Todo: 상장폐지 심볼 처리
  const endpoint = new URL(`/trading/${exchange}`, DESKTOP_BACKEND_BASE_URL);
  const queryParams = JSON.stringify(symbols);
  endpoint.searchParams.set('symbols', queryParams);

  const response = await fetch<ResponseDto<z.infer<typeof TradingDataResponseSchema>[]>>(endpoint.href, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const backendResponse = response.data;

  console.log(`[UPBIT TRADING DATA FROM BACKEND]`, backendResponse);

  if (backendResponse.success) {
    return backendResponse.data;
  } else {
    // Todo: handle error
    // throw new Error(backendResponse.message);
    return [];
  }
}

/**
 * @description Fetch trading data from local backend DB
 */
export async function fetchPositions({ wallet }: { wallet?: Wallet }): Promise<PositionsResponse[]> {
  if (!wallet) {
    return [];
  }

  const endpoint = new URL(`/exchange/${wallet.exchange}`, DESKTOP_BACKEND_BASE_URL);
  const response = await fetch<ResponseDto<PositionsResponse[]>>(endpoint.href, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });

  const dto: ResponseDto<PositionsResponse[]> = response.data;
  console.log(`[POSITION DTO]`, dto);

  if (!dto.success) {
    return [];
  }

  const positions = dto.data;
  return positions;
}
