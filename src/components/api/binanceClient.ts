import { z } from 'zod';
import { fetch } from '@tauri-apps/api/http';
import {
  BinanceAssetResponseSchema,
  BinanceWalletAssetSchema,
  BinanceWalletSchema,
  BinanceWebScoketRequestPayloadSchema,
} from '@/schemas/binanceSchema.ts';
import { createSignature } from '@/lib/crypto.ts';
import { BINANCE_API_ACCESS_KEY, BINANCE_API_BASE_URL, BINANCE_API_SECRET_KEY } from '@/constants/binance.ts';
import { TickerRequest } from '@/types/exchangeTypes.ts';
import { BinanceTickersWithKey } from '@/types/binanceTypes.ts';

export function createBinanceQueryString(payload: z.infer<typeof BinanceWebScoketRequestPayloadSchema>) {
  const queryString = Object.keys(payload)
    .map((key) => `${key}=${encodeURIComponent(payload[key])}`)
    .join('&');
  console.log(`[SG KEY QS]`, queryString);
  return queryString;
}

export async function createBinanceSignature(payload: z.infer<typeof BinanceWebScoketRequestPayloadSchema>) {
  const queryString = createBinanceQueryString(payload);
  return await createSignature({
    secret: BINANCE_API_SECRET_KEY,
    data: queryString,
  });
}

export async function getBinaceWallet(): Promise<z.infer<typeof BinanceWalletSchema>> {
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

    const foundUsdt = response.data.find((item) => item.asset === 'USDT');
    const usdt: z.infer<typeof BinanceWalletAssetSchema> = foundUsdt
      ? {
          ...foundUsdt,
          key: foundUsdt.asset, // Todo: Replace to SYMBOL,MARET. ex) BTCUSDT
        }
      : {
          asset: 'USDT',
          free: '0',
          locked: '0',
          freeze: '0',
          withdrawing: '0',
          ipoable: '0',
          btcValuation: '0',
          key: 'USDT',
        };
    const withOutUsdt = response.data
      .filter((item) => item.asset !== 'USDT')
      .map((item) => ({
        ...item,
        key: `${item.asset}USDT`,
      }));

    return {
      exchange: 'binance',
      usdt,
      withOutUsdt,
    };
  } catch (e) {
    console.error(`[BINANCE WALLET ERROR]`, e);
    throw e;
  }
}

type BinanceTicker = {
  symbol: string;
  price: string;
};

export async function getBinanceTickers({ symbols }: Pick<TickerRequest, 'symbols'>): Promise<BinanceTickersWithKey> {
  console.log(`[BINANCE SYMBOLS]`, symbols);
  const endpoint = new URL('/api/v3/ticker/price', BINANCE_API_BASE_URL);
  const queryString = JSON.stringify(symbols);
  endpoint.searchParams.append('symbols', queryString);

  // Todo: 상장 폐지 코인 검증

  const response = await fetch<BinanceTicker[]>(endpoint.href, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const tickers = response.data.reduce((acc, item) => {
    return {
      ...acc,
      [item.symbol]: {
        ...item,
        key: item.symbol,
      },
    };
  }, {} as BinanceTickersWithKey);

  return tickers;
}
