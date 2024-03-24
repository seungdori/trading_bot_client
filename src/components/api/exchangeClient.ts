import { Exchange, Wallet_v2 } from '@/types/exchangeTypes.ts';
import { fetchWalletFromBackend } from '@/components/api/desktopClient.ts';

export async function getWalletFromBackend(exchange: Exchange): Promise<Wallet_v2> {
  return fetchWalletFromBackend(exchange);
}
