import { fetch } from '@tauri-apps/api/http';
import * as uuid from 'uuid';
import * as jose from 'jose';
import { z } from 'zod';
import {
  UpbitAssetResponseSchema,
  UpbitMarketCodeSchema,
  UpbitWalletAssetSchema,
  UpbitWalletSchema,
} from '@/schemas/upbitSchema.ts';
import { TickerRequest } from '@/types/exchangeTypes.ts';
import { UpbitTickersWithKey } from '@/types/upbitTypes.ts';
import { useUpbitAvailableMarketsStore } from '@/store/upbitAvailableMarketsStore.ts';

export const UPBIT_ACCESS_KEY = `VAkx0co5MdTOYWTx5WViT2J3YU4DtvaTpFxwzbII`;
export const UPBIT_SECRET_KEY = `9fiLxPwcd8zA23t3IlxMU8vHFxcLZbMsgQaziOxS`;

export const UPBIT_REST_API_URL = `https://api.upbit.com`;
export const UPBIT_WS_URL = `wss://api.upbit.com/websocket/v1`;
const alg = 'HS256';
const secret = new TextEncoder().encode(UPBIT_SECRET_KEY);

export async function getUpbitAccessToken() {
  const payload = {
    access_key: UPBIT_ACCESS_KEY,
    nonce: uuid.v4(),
  };
  const token = await new jose.SignJWT(payload).setProtectedHeader({ alg }).setIssuedAt().sign(secret);

  return token;
}

export async function getUpbitWallet(): Promise<z.infer<typeof UpbitWalletSchema>> {
  const endpoint = new URL('/v1/accounts', UPBIT_REST_API_URL);
  const accessToken = await getUpbitAccessToken();

  try {
    const response = await fetch<z.infer<typeof UpbitAssetResponseSchema>[]>(endpoint.href, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = response.data;
    console.log(`[UPBIT ACCOUNT INFO]`, data);

    // If KRW not exist then set default KRW
    const foundKrw = data.find((item) => item.currency === 'KRW');
    const krw: z.infer<typeof UpbitWalletAssetSchema> = foundKrw
      ? {
          ...foundKrw,
          key: `${foundKrw.unit_currency}-${foundKrw.currency}`,
        }
      : {
          key: 'KRW-KRW',
          currency: 'KRW',
          balance: '0',
          locked: '0',
          avg_buy_price: '0',
          avg_buy_price_modified: false,
          unit_currency: 'KRW',
        };

    const withOutKrw = data
      .filter((item) => item.currency !== 'KRW')
      .map((item) => ({
        ...item,
        key: `${item.unit_currency}-${item.currency}`,
      }));

    return {
      exchange: 'upbit',
      krw,
      withOutKrw,
    };
  } catch (e) {
    console.error(`[UPBIT ACCOUNT INFO ERROR]`, e);
    throw new Error(`${JSON.stringify(e)}`);
  }
}

export async function getUpbitAvailableMarkets(): Promise<string[]> {
  const { availableMarkets, setAvailableMarkets } = useUpbitAvailableMarketsStore();

  if (availableMarkets && availableMarkets.length > 0) {
    return availableMarkets as string[];
  }

  const endpoint = new URL('v1/market/all', UPBIT_REST_API_URL);
  try {
    const response = await fetch<z.infer<typeof UpbitMarketCodeSchema>[]>(endpoint.href, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Todo: set available markets to url query params (cache)
    const markets = response.data.map((item) => item.market);
    setAvailableMarkets(markets);

    return markets;
  } catch (e) {
    console.error(e);
    throw e;
  }
}

export async function getUpbitTickers({ symbols }: Pick<TickerRequest, 'symbols'>): Promise<UpbitTickersWithKey> {
  // Todo: Cache available markets
  const availableMarkets = await getUpbitAvailableMarkets();
  const markets = availableMarkets.filter((availableMarket) => symbols.includes(availableMarket));

  const endpoint = new URL('v1/ticker', UPBIT_REST_API_URL);
  endpoint.searchParams.append('markets', markets.join(','));
  try {
    const response = await fetch<Record<string, any>[]>(endpoint.href, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    console.log(`[UPBIT RAW TICKER INFO]`, response.data);

    const tickers = response.data.reduce((acc, item) => {
      const key = item.market;
      acc[key] = item;
      return acc;
    }, {} as UpbitTickersWithKey);
    console.log(`[UPBIT TICKER INFO]`, tickers);

    return tickers;
  } catch (e) {
    console.error(e);
    throw new Error(`${JSON.stringify(e)}`);
  }
}
