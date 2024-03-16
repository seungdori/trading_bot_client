import { fetch } from '@tauri-apps/api/http';
import * as uuid from 'uuid';
import * as jose from 'jose';
import { z } from 'zod';
import {
  UpbitAssetResponseSchema,
  UpbitPrivateEndpointErrorResponseSchema,
  UpbitWalletAssetSchema,
} from '@/schemas/upbitSchema.ts';
import { UpbitWallet } from '@/types/exchangeTypes.ts';
import { UpbitPrivateEndpointErrorResponse } from '@/types/upbitTypes.ts';
import { ExchangeApiKeys } from '@/types/settingsTypes.ts';
import { UPBIT_REST_API_URL } from '@/constants/upbit.ts';
import { toast } from '@/components/ui/use-toast.ts';

const alg = 'HS256';
const textEncoder = new TextEncoder();

export async function getUpbitAccessToken({ apiKey, secret }: ExchangeApiKeys) {
  const payload = {
    access_key: apiKey,
    nonce: uuid.v4(),
  };
  const encodedSecret = textEncoder.encode(secret);
  const token = await new jose.SignJWT(payload).setProtectedHeader({ alg }).setIssuedAt().sign(encodedSecret);

  return token;
}

export async function getUpbitWallet(apiKeys: ExchangeApiKeys): Promise<UpbitWallet> {
  const endpoint = new URL('/v1/accounts', UPBIT_REST_API_URL);
  const accessToken = await getUpbitAccessToken(apiKeys);

  try {
    const response = await fetch<z.infer<typeof UpbitAssetResponseSchema>[]>(endpoint.href, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw response.data as unknown as UpbitPrivateEndpointErrorResponse;
    }

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
    const validUpbitError = UpbitPrivateEndpointErrorResponseSchema.safeParse(e);
    if (validUpbitError.success) {
      const upbitError = validUpbitError.data;
      if (upbitError.error.name === 'no_authorization_ip') {
        toast({ title: '업비트 거래소에 등록된 ip가 아닙니다. 올바른 ip가 등록되있는지 확인해주세요.' });
      }
    }
    throw new Error(`${JSON.stringify(e)}`);
  }
}
