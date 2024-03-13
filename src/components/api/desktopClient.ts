import { z } from 'zod';
import { Body, fetch } from '@tauri-apps/api/http';
import { getnerateRandomTransactionLog } from '@/helper/typia/generated/mock.ts';
import { TradingSearchParamsSchema } from '@/schemas/searchParamsSchema.ts';
import { BinanceStateStore, ExchangeStateStore } from '@/store/strategyStore.ts';
import { Upbit } from '@/types/exchangeTypes.ts';
import {
  DESKTOP_BACKEND_BASE_URL,
  LoginSchema,
  SignupSchema,
  TradingDataResponseSchema,
  UserExistSchema,
} from '@/schemas/backendSchema.ts';
import {
  FetchPositionsRequest,
  PositionsResponse,
  ResponseDto,
  StartFeatureRequest,
  StopFeatureRequest,
  UpbitPositionsResponse,
  User,
} from '@/types/backendTypes.ts';
import { BINANCE_API_ACCESS_KEY, BINANCE_API_BASE_URL } from '@/constants/binance.ts';
import { createBinanceQueryString, createBinanceSignature } from '@/components/api/binanceClient.ts';
import { BinanceAssetResponseSchema } from '@/schemas/binanceSchema.ts';

/**
 * @description 로컬 백엔드에 사용자가 존재하는지 확인.
 * 사용자가 존재하면 로그인페이지로 이동.
 * 존재하지 않으면 회원가입 페이지로 이동.
 */
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

/**
 * @description 로컬 백엔드 회원가입.
 */
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

/**
 * @description 로컬 백엔드 로그인.
 */
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

/**
 * @description 로컬 백엔드에 사용자 거래 내역 요청.
 */
export async function getTransactionLog(exchange: z.infer<typeof TradingSearchParamsSchema>['exchange']) {
  try {
    const endpoint = new URL('/sapi/v3/asset/getUserAsset', BINANCE_API_BASE_URL);
    const timestamp = Date.now();
    const recvWindow = 60000;
    const payload: Record<string, any> = {
      timestamp,
      recvWindow,
    };

    // const queryString = createBinanceQueryString(payload);
    // const signature = await createBinanceSignature(payload);
    // const url = endpoint.href + '?' + queryString + '&signature=' + signature;

    // const response = await fetch<z.infer<typeof BinanceAssetResponseSchema>[]>(url, {
    //   method: 'POST',
    //   headers: {
    //     'X-MBX-APIKEY': BINANCE_API_ACCESS_KEY,
    //     'Content-Type': 'application/xxx-www-form-urlencoded',
    //   },
    // });
    // console.log(`[BINANCE WALLET]`, response.data);
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
 * @description 로컬 백엔드에 사용자 포지션 요청. 거래소 api 요청은 백엔드에서 진행.
 */
export async function fetchPositions(args: FetchPositionsRequest): Promise<PositionsResponse[]> {
  // Todo: remove after change IP
  return [];

  const endpoint = new URL(`/exchange`, DESKTOP_BACKEND_BASE_URL);
  const response = await fetch<ResponseDto<PositionsResponse[]>>(endpoint.href, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: Body.json(args),
  });

  const dto: ResponseDto<PositionsResponse[]> = response.data;
  console.log(`[POSITION DTO]`, dto);

  if (!dto.success) {
    return [];
  }

  const positions = dto.data;
  return positions;
}

/**
 * @description 백엔드에 사용자가 설정한 전략 시작 요청. 백엔드는 거래소 api를 통해 사용자의 전략을 실행.
 */
export async function startCustomStrategy(exchangeStore: Pick<ExchangeStateStore, 'exchange' | 'store'>) {
  const endpoint = new URL(`/feature/start`, DESKTOP_BACKEND_BASE_URL);
  const dto: StartFeatureRequest = {
    exchange_name: exchangeStore.exchange,
    custom_strategy: exchangeStore.store.customStrategy,
    enter_strategy: exchangeStore.store.enterStrategy,
    enter_symbol_amount: exchangeStore.store.enterSymbolAmount,
    enter_symbol_count: exchangeStore.store.enterSymbolCount,
    leverage:
      exchangeStore.exchange === 'binance' ? (exchangeStore.store as BinanceStateStore['store']).leverage : undefined,
  };

  console.log(`[START CUSTOM STARKEY DTO]`, dto);

  try {
    const response = await fetch<ResponseDto<unknown>>(endpoint.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: Body.json(dto),
    });

    const responseDto = response.data;
    console.log('[START CUSTOM REPOSITORY]', responseDto);

    return responseDto;
  } catch (e) {
    console.error(`[START CUSTOM STRATEGY ERROR]`, e);
    console.error(e);
    throw e;
  }
}

/**
 * @description 백엔드에 사용자가 설정한 전략을 중지 요청. 백엔드는 거래소 api를 통해 사용자의 전략을 중지.
 */
export async function stopCustomStrategy(exchangeStore: Pick<ExchangeStateStore, 'exchange' | 'store'>) {
  const endpoint = new URL(`/feature/stop`, DESKTOP_BACKEND_BASE_URL);
  const dto: StopFeatureRequest = {
    exchange_name: exchangeStore.exchange,
    custom_strategy: exchangeStore.store.customStrategy,
    enter_strategy: exchangeStore.store.enterStrategy,
  };

  console.log(`[STOP CUSTOM STARKEY DTO]`, dto);

  try {
    const response = await fetch<ResponseDto<unknown>>(endpoint.href, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: Body.json(dto),
    });

    const responseDto = response.data;
    console.log('[STOP CUSTOM REPOSITORY]', responseDto);

    return responseDto;
  } catch (e) {
    console.error(`[STOP CUSTOM STRATEGY ERROR]`, e);
    console.error(e);
    throw e;
  }
}
