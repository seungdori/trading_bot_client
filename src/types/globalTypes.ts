import * as ccxt from 'ccxt';

declare global {
  interface Window {
    ccxt: typeof ccxt;
  }
}
