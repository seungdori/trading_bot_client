// Web crypto API
const WebCryptoAPI = window.crypto.subtle;
// import * as  crypto from 'crypto'; // Do not use this.

type Algorithm = { name: string; hash: { name: string } };
function str2ab(str: string): ArrayBuffer {
  const buf = new ArrayBuffer(str.length);
  const bufView = new Uint8Array(buf);
  for (let i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i);
  }
  return buf;
}

async function importKey(rawKey: ArrayBuffer, algorithm: Algorithm): Promise<CryptoKey> {
  const key = await WebCryptoAPI.importKey('raw', rawKey, algorithm, false, ['sign', 'verify']);
  return key;
}
async function sign(key: CryptoKey, data: ArrayBuffer, algorithm: Algorithm): Promise<ArrayBuffer> {
  const signature = await WebCryptoAPI.sign(algorithm.name, key, data);
  return signature;
}

function buf2hex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
export async function createHexSignature(
  { secret, data }: { secret: string; data: string },
  { algorithm }: { algorithm: Algorithm },
): Promise<string> {
  const rawKey = str2ab(secret);
  const rawData = str2ab(data);
  const key = await importKey(rawKey, algorithm);
  const signature = await sign(key, rawData, algorithm);
  const hexSignature = buf2hex(signature);

  return hexSignature;
}

export function hexStringToString(hexStr: string): string {
  let str = '';
  for (let i = 0; i < hexStr.length; i += 2) {
    const byteValue = parseInt(hexStr.substr(i, 2), 16);
    str += String.fromCharCode(byteValue);
  }
  return str;
}
