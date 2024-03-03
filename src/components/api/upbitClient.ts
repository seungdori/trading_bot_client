import { fetch } from '@tauri-apps/api/http';
import * as uuid from 'uuid';
import * as jose from 'jose';
import { z } from 'zod';
import { UpbitWalletAssetSchema, UpbitWalletResponseSchema, UpbitWalletSchema } from '@/schemas/upbitSchema.ts';

// UPBIT_OPEN_API_ACCESS_KEY=VAkx0co5MdTOYWTx5WViT2J3YU4DtvaTpFxwzbII
// UPBIT_OPEN_API_SECRET_KEY=9fiLxPwcd8zA23t3IlxMU8vHFxcLZbMsgQaziOxS
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

  // const token = await new jose.SignJWT(payload).setProtectedHeader({ alg }).setIssuedAt().sign(secret);
  const token = await new jose.SignJWT(payload).setProtectedHeader({ alg }).setIssuedAt().sign(secret);
  // const token = await new jose.SignJWT(payload)
  //   .setProtectedHeader({ alg })
  //   .setIssuedAt()
  //   .setIssuer('urn:example:issuer')
  //   .setAudience('urn:example:audience')
  //   .setExpirationTime('2h')
  //   .sign(secret);
  // const response = await fetch<{ token: string }>('http://localhost:3000/token', {
  //   method: 'GET',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  // });
  //
  // console.log(`[UPBIT TOKEN RESPONSE]`, response);
  //
  // const { token } = response.data;
  // console.log(`[UPBIT TOKEN]`, token);

  return token;
}

export async function getUpbitWallet(): Promise<z.infer<typeof UpbitWalletSchema>> {
  const endpoint = `${UPBIT_REST_API_URL}/v1/accounts`;
  const accessToken = await getUpbitAccessToken();

  try {
    const response = await fetch<z.infer<typeof UpbitWalletResponseSchema>[]>(endpoint, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = response.data;
    console.log(`[UBPIT ACCOUNT INFO]`, data);

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
    console.error(`[UBPIT ACCOUNT INFO ERROR]`, e);
    throw new Error(`${JSON.stringify(e)}`);
  }
}

// async connectToUpbit() {
//   const payload = {
//     access_key: this.UPBIT_OPEN_API_ACCESS_KEY,
//     nonce: uuidv4(),
//   };
//
//   const jwtToken = this.jwtService.sign(payload);
//   this.wsClient = new WebSocket('wss://api.upbit.com/websocket/v1', {
//     headers: {
//       authorization: Bearer ${jwtToken}
//     }
//   });
//
//   this.wsClient.on('open', () => {
//     const test = this.allTickers.map(item => "${item}")
//     console.log(Connected to Upbit WebSocket API${test});
//     this.wsClient.send([{"ticket":"test"},{"type":"ticker","codes":[${test}]}]);
//   });
//
//   this.wsClient.on('message', (data) => {
//     console.log(data.toString());
//   });
//
//   this.wsClient.on('error', console.error);
//   this.wsClient.on('close', () => console.log('WebSocket closed!'));
// }
