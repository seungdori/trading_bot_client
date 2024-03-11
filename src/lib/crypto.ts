// Web crypto API
const WebCryptoAPI = window.crypto.subtle;
// import * as  crypto from 'crypto'; // Do not use this.

function str2ab(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

async function importKey(rawKey: ArrayBuffer): Promise<CryptoKey> {
  const key = await WebCryptoAPI.importKey('raw', rawKey, { name: 'HMAC', hash: { name: 'SHA-256' } }, false, [
    'sign',
    'verify',
  ]);
  return key;
}
async function sign(key: CryptoKey, data: ArrayBuffer): Promise<ArrayBuffer> {
  const signature = await WebCryptoAPI.sign('HMAC', key, data);
  return signature;
}

function buf2hex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export async function createSignature({ secret, data }: { secret: string; data: string }): Promise<string> {
  const rawKey = str2ab(secret);
  const rawData = str2ab(data);
  const key = await importKey(rawKey);
  const signature = await sign(key, rawData);
  const hexSignature = buf2hex(signature);

  return hexSignature;
}
