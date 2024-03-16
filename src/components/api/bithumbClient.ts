import { fetch, Body } from '@tauri-apps/api/http';
import hamcSHA512 from 'crypto-js/hmac-sha512';
import { BithumbWallet } from '@/types/exchangeTypes.ts';
import { ExchangeApiKeys } from '@/types/settingsTypes.ts';
import { BITHUMB_INVALID_IP_ERROR_CODE, BITHUMB_REST_API_URL } from '@/constants/bithumb.ts';
import { z } from 'zod';
import { toast } from '@/components/ui/use-toast.ts';

function createSignature({ secret, data }: { secret: string; data: string }): string {
  const hmac = hamcSHA512(data, secret).toString();
  return window.btoa(hmac);
}

function urlencode(params: Record<string, string>): string {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
}

async function buildHeader(
  args: { endPoint: string; params: Record<string, string> } & ExchangeApiKeys,
): Promise<Record<string, string>> {
  const { endPoint, params, apiKey, secret } = args;

  const nonce = new Date().getTime().toString();
  const paramString = urlencode(params);
  const data = `${endPoint};${paramString};${nonce}`;
  const apiSign = createSignature({ secret, data });

  return {
    'api-client-type': '2', // Assuming this is how you want to handle this parameter
    'Api-Key': apiKey,
    'Api-Nonce': nonce,
    'Api-Sign': apiSign, // Ensure this is correctly encoded as Base64 if not already
  };
}

type BithumbBalanceResponse = {
  status: string;
  data: Record<string, string>;
};

const BithumbErrorResponseSchema = z.object({
  status: z.string(),
  message: z.string(),
});

type BithumbErrorResponse = z.infer<typeof BithumbErrorResponseSchema>;

export async function getBithumbWallet(apiKeys: ExchangeApiKeys): Promise<BithumbWallet> {
  const endpoint = '/info/balance';
  const url = new URL(endpoint, BITHUMB_REST_API_URL);
  const params = {
    endpoint,
    currency: 'ALL',
  };

  console.log(`[API KEYS]`, apiKeys);
  const header = await buildHeader({ endPoint: endpoint, params, ...apiKeys });
  console.log(`[BITHUMB WALLET HEADER]`, header);

  try {
    const response = await fetch<BithumbBalanceResponse>(url.href, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...header,
      },
      body: Body.form(params),
    });
    console.log(`[BITHUMB WALLET RESPONSE]`, response);

    if (!response.ok) {
      throw response.data as unknown as BithumbErrorResponse;
    }

    const bithumbBalanceResponse = response.data;

    const totalKrw = bithumbBalanceResponse.data['total_krw'];
    console.log(`[BITHUMB WALLET KRWWWWW]`, totalKrw);
    return {
      exchange: 'bithumb',
      krw: totalKrw,
    };
  } catch (e) {
    console.error(e);
    const validBithumbError = BithumbErrorResponseSchema.safeParse(e);
    if (validBithumbError.success) {
      const bithumbError = validBithumbError.data;
      if (bithumbError.status === BITHUMB_INVALID_IP_ERROR_CODE) {
        toast({ title: '빗썸 거래소에 등록된 ip가 아닙니다. 올바른 ip가 등록되있는지 확인해주세요.' });
      }
    }

    throw e;
  }
}
