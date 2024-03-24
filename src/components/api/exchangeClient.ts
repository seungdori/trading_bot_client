import { Exchange, Wallet } from '@/types/exchangeTypes.ts';
import { fetchWalletFromBackend } from '@/components/api/desktopClient.ts';

export async function getWalletFromBackend(exchange: Exchange): Promise<Wallet> {
  return fetchWalletFromBackend(exchange);
}
