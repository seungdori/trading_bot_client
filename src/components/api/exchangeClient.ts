// import { getUpbitWallet } from '@/components/api/upbitClient.ts';
// import { getBinaceWallet } from '@/components/api/binanceClient.ts';
// import { getBithumbWallet } from '@/components/api/bithumbClient.ts';
// import { ExchangeApiKeys } from '@/types/settingsTypes.ts';
import { Exchange, Wallet_v2 } from '@/types/exchangeTypes.ts';
import { fetchWalletFromBackend } from '@/components/api/desktopClient.ts';

// export async function getWallet(exchange: Exchange, apiKeys: ExchangeApiKeys): Promise<Wallet> {
//   switch (exchange) {
//     case 'upbit':
//       return getUpbitWallet(apiKeys);
//     case 'binance':
//       return getBinaceWallet(apiKeys);
//     case 'bithumb':
//       return getBithumbWallet(apiKeys);
//     default:
//       throw new Error('Invalid exchange');
//   }
// }

export async function getWalletFromBackend(exchange: Exchange): Promise<Wallet_v2> {
  return fetchWalletFromBackend(exchange);
}
