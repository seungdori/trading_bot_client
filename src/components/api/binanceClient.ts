import { z } from 'zod';
import { fetch } from '@tauri-apps/api/http';
import {
  BinanceAssetResponseSchema,
  BinanceWalletAssetSchema,
  BinanceWebScoketRequestPayloadSchema,
} from '@/schemas/binanceSchema.ts';
import { createHexSignature } from '@/lib/crypto.ts';
import { BINANCE_API_BASE_URL } from '@/constants/binance.ts';
import { BinanceWallet } from '@/types/exchangeTypes.ts';
import { ExchangeApiKeys } from '@/types/settingsTypes.ts';
import { toast } from '@/components/ui/use-toast.ts';

export function createBinanceQueryString(payload: z.infer<typeof BinanceWebScoketRequestPayloadSchema>) {
  const queryString = Object.keys(payload)
    .map((key) => `${key}=${encodeURIComponent(payload[key])}`)
    .join('&');
  console.log(`[SG KEY QS]`, queryString);
  return queryString;
}

export async function createBinanceSignature(
  payload: z.infer<typeof BinanceWebScoketRequestPayloadSchema>,
  secret: string,
) {
  const queryString = createBinanceQueryString(payload);
  return await createHexSignature(
    {
      secret: secret,
      data: queryString,
    },
    { algorithm: { name: 'HMAC', hash: { name: 'SHA-256' } } },
  );
}

export async function getBinaceWallet({ apiKey, secret }: ExchangeApiKeys): Promise<BinanceWallet> {
  try {
    const endpoint = new URL('/sapi/v3/asset/getUserAsset', BINANCE_API_BASE_URL);
    const timestamp = Date.now();
    const recvWindow = 60000;
    const payload: Record<string, any> = {
      timestamp,
      recvWindow,
    };

    const queryString = createBinanceQueryString(payload);
    const signature = await createBinanceSignature(payload, secret);
    const url = endpoint.href + '?' + queryString + '&signature=' + signature;

    const response = await fetch<z.infer<typeof BinanceAssetResponseSchema>[]>(url, {
      method: 'POST',
      headers: {
        'X-MBX-APIKEY': apiKey,
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
    console.log(`=====================`);
    console.log(e);
    if (typeof e === 'string') {
      // Binance IP 등록되지 않은 경우
      if (e.includes('connection closed')) {
        toast({ title: '바이낸스 거래소에 등록된 ip가 아닙니다. 올바른 ip가 등록되있는지 확인해주세요.' });
      }
    }

    throw e;
  }
}
