import { fetch, Body } from '@tauri-apps/api/http';
// Web crypto API
const WebCryptoAPI = window.crypto.subtle;
// import * as  crypto from 'crypto'; // Do not use this.
import { BithumbTickersWithKey } from '@/types/bithumbTypes.ts';
import { BithumbWallet, TickerRequest } from '@/types/exchangeTypes.ts';
import { ExchangeApiKeys } from '@/types/settingsTypes.ts';
import { BITHUMB_REST_API_URL } from '@/constants/bithumb.ts';
import { encodeToBase64 } from '@/lib/base64.ts';

const enc = new TextEncoder();
const algorithm = { name: 'HMAC', hash: 'SHA-512' };

async function createSignature({ secret, data }: { secret: string; data: string }): Promise<string> {
  const key = await WebCryptoAPI.importKey('raw', enc.encode(secret), algorithm, false, ['sign', 'verify']);
  const signature = await WebCryptoAPI.sign(algorithm.name, key, enc.encode(data));
  const digest = encodeToBase64(String.fromCharCode(...new Uint8Array(signature)));
  console.log(`[BITHUMB WALLET DIGEST]`, digest);
  return digest;
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
  console.log(`[BITHUMB WALLET PARAM STRING]`, paramString);
  const data = `${endPoint};${paramString};${nonce}`;

  console.log(`[BITHUMB WALLET HEADER DATA]`, data);
  const apiSign = await createSignature({ secret, data });

  return {
    'api-client-type': '2', // Assuming this is how you want to handle this parameter
    'Api-Key': apiKey,
    'Api-Nonce': nonce,
    'Api-Sign': apiSign, // Ensure this is correctly encoded as Base64 if not already
  };
}

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
    const response = await fetch<unknown>(url.href, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        ...header,
      },
      body: Body.form({
        currency: 'ALL',
      }),
    });
    console.log(`[BITHUMB WALLET RESPONSE]`, response);

    const data = response.data;
    console.log(`[BITHUMB WALLET DATA]`, data);
  } catch (e) {
    console.error(e);
    throw e;
  }

  return {
    exchange: 'bithumb',
  };
}
//
// export async function getBithumbWallet(apiKeys: ExchangeApiKeys): Promise<BithumbWallet> {
//   const endpoint = new URL('/info/balance', BITHUMB_REST_API_URL);
//   const header = {
//     'api-client-type': '2', // Api-Sign 생성 시 사용하는 구분자 유형. 세미콜론 구분자 사용. "2" : ";"
//     'Api-Key': apiKeys.apiKey,
//     'Api-Sign': '',
//     'Api-Nonce': Date.now().toString(),
//   };
//   return {
//     exchange: 'bithumb',
//   };
// }

export async function getBithumbTickers({ symbols }: Pick<TickerRequest, 'symbols'>): Promise<BithumbTickersWithKey> {
  return {};
}

const base64_encode = (data: string) => {
  // discuss at: http://phpjs.org/functions/base64_encode/
  // original by: Tyler Akins (http://rumkin.com)
  // improved by: Bayron Guevara
  // improved by: Thunder.m
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Rafał Kukawski (http://kukawski.pl)
  // bugfixed by: Pellentesque Malesuada
  // example 1: base64_encode('Kevin van Zonneveld');
  // returns 1: 'S2V2aW4gdmFuIFpvbm5ldmVsZA=='
  // example 2: base64_encode('a');
  // returns 2: 'YQ=='

  const b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
  let o1,
    o2,
    o3,
    h1,
    h2,
    h3,
    h4,
    bits,
    i = 0,
    ac = 0,
    enc = '',
    tmp_arr = [];

  if (!data) {
    return data;
  }

  do {
    // pack three octets into four hexets
    o1 = data.charCodeAt(i++);
    o2 = data.charCodeAt(i++);
    o3 = data.charCodeAt(i++);

    bits = (o1 << 16) | (o2 << 8) | o3;

    h1 = (bits >> 18) & 0x3f;
    h2 = (bits >> 12) & 0x3f;
    h3 = (bits >> 6) & 0x3f;
    h4 = bits & 0x3f;

    // use hexets to index into b64, and append result to encoded string
    tmp_arr[ac++] = b64.charAt(h1) + b64.charAt(h2) + b64.charAt(h3) + b64.charAt(h4);
  } while (i < data.length);

  enc = tmp_arr.join('');

  const r = data.length % 3;

  return (r ? enc.slice(0, r - 3) : enc) + '==='.slice(r || 3);
};

const chr = (codePt: number) => {
  //  discuss at: http://phpjs.org/functions/chr/
  // original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)
  // improved by: Brett Zamir (http://brett-zamir.me)
  //   example 1: chr(75) === 'K';
  //   example 1: chr(65536) === '\uD800\uDC00';
  //   returns 1: true
  //   returns 1: true

  if (codePt > 0xffff) {
    // Create a four-byte string (length 2) since this code point is high
    //   enough for the UTF-16 encoding (JavaScript internal use), to
    //   require representation with two surrogates (reserved non-characters
    //   used for building other characters; the first is "high" and the next "low")
    codePt -= 0x10000;
    return String.fromCharCode(0xd800 + (codePt >> 10), 0xdc00 + (codePt & 0x3ff));
  }
  return String.fromCharCode(codePt);
};
