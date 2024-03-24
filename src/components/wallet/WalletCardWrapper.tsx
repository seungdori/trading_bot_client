import WalletCardContent from '@/components/wallet/WalletCardContent.tsx';
import WalletCard from '@/components/wallet/WalletCard.tsx';
import { useWallet } from '@/hooks/useWallet.ts';
import { Exchange, Wallet_v2 } from '@/types/exchangeTypes.ts';
import { Icons } from '@/components/common/Icons.tsx';
import { toast } from '@/components/ui/use-toast.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';
import { formatNum } from '@/lib/format.ts';
import { z } from 'zod';

type Props = { className?: string };

export default function WalletCardWrapper({ className }: Props) {
  const { exchange } = useExchangeStore();
  const { isLoading, data: wallet, error } = useWallet({ exchange });

  if (error) {
    console.error(`[WALLET ERROR]`, error);
    toast({ title: '거래소 조회 실패', description: error.message });
    return (
      <div className="flex w-full h-full items-center justify-center">
        <p>Failed to load wallet</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const title = buildExchangeName(exchange);
  const balance = getBalance(wallet);
  const formattedBalance = formatBalance(balance, exchange);
  const balanceDescription = buildBalanceDescription(exchange);
  const unrealizedProfit = buildTotalUnrealizedProfit({ exchange, wallet });
  const totalBalance = buildTotalBalance({ exchange, wallet });

  return (
    <WalletCard className={className} title={title} description={'지갑 정보'}>
      <WalletCardContent
        balance={formattedBalance}
        balanceDescription={balanceDescription}
        totalBalance={totalBalance}
        unrealizedProfit={unrealizedProfit}
      />
    </WalletCard>
  );
}

function buildExchangeName(exchange: Exchange) {
  switch (exchange) {
    case 'binance':
      return '바이낸스';
    case 'bithumb':
      return '빗썸';
    case 'upbit':
      return '업비트';
    default:
      throw new Error('Invalid exchange');
  }
}

function getBalance(wallet: Wallet_v2 | undefined): number {
  return wallet?.walletBalance ?? 0;
}

function formatBalance(balance: number, exchange: Exchange): string {
  switch (exchange) {
    case 'binance':
      return formatNum({
        num: balance,
        currencySymbol: 'USDT',
      });
    case 'upbit':
      return formatNum({
        num: balance,
        currencySymbol: '₩',
      });
    case 'bithumb':
      return formatNum({
        num: balance,
        currencySymbol: '₩',
      });
  }
}

function buildBalanceDescription(exchange: Exchange) {
  switch (exchange) {
    case 'binance':
      return '보유 USDT';
    case 'upbit':
      return '보유 KRW';
    case 'bithumb':
      return '보유 KRW';
  }
}

function buildTotalUnrealizedProfit({
  exchange,
  wallet,
}: {
  exchange: Exchange;
  wallet: Wallet_v2 | undefined;
}): string | null {
  const validTotalUnrealizedProfit = z.number().safeParse(wallet?.totalUnrealizedProfit);
  if (!validTotalUnrealizedProfit.success) {
    return null;
  }

  const totalUnrealizedProfit = validTotalUnrealizedProfit.data;
  switch (exchange) {
    case 'binance':
      return formatNum({
        num: totalUnrealizedProfit,
        precision: 1,
        currencySymbol: 'USDT',
      });

    case 'upbit':
      return formatNum({
        num: totalUnrealizedProfit,
        precision: 1,
        currencySymbol: '₩',
      });

    case 'bithumb':
      return null;

    default:
      return null;
  }
}

function buildTotalBalance({ exchange, wallet }: { exchange: Exchange; wallet: Wallet_v2 | undefined }): string | null {
  const validTotalBalance = z.number().safeParse(wallet?.totalBalance);
  if (!validTotalBalance.success) {
    return null;
  }

  const totalBalance = validTotalBalance.data;
  switch (exchange) {
    case 'binance':
      return formatNum({
        num: totalBalance,
        precision: 1,
        currencySymbol: 'USDT',
      });

    case 'upbit':
    case 'bithumb':
      return formatNum({
        num: totalBalance,
        precision: 1,
        currencySymbol: '₩',
      });

    default:
      return null;
  }
}
