import { Base64 } from 'js-base64';

export function encodeToBase64(source: string) {
  return Base64.btoa(source);
}

export function decodeFromBase64(source: string) {
  return Base64.atob(source);
}
