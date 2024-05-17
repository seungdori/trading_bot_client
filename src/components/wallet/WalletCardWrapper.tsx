import WalletCardContent from '@/components/wallet/WalletCardContent.tsx';
import WalletCard from '@/components/wallet/WalletCard.tsx';
import { useWallet } from '@/hooks/useWallet.ts';
import { Exchange, Wallet } from '@/types/exchangeTypes.ts';
import { Icons } from '@/components/common/Icons.tsx';
import { useExchangeStore } from '@/store/exchangeStore.ts';
import { formatNum } from '@/lib/format.ts';
import { z } from 'zod';
import { EXCHANGE } from '@/constants/exchange.ts';

type Props = { className?: string };

export default function WalletCardWrapper({ className }: Props) {
  const { exchange } = useExchangeStore();
  const { isLoading, data: wallet, isError, error } = useWallet({ exchange });

  if (isError) {
    return (
      <div className="container flex flex-col w-full h-full items-center justify-center space-y-2">
        <p className="w-full font-bold">거래소 조회에 실패했습니다</p>
        <p className="w-full font-semibold">상세 정보</p>
        <p className="w-full text-xs whitespace-pre-wrap">{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex flex-col w-full h-full items-center justify-center">
        <Icons.spinner className="h-4 w-4 animate-spin" />
        <p className="mt-4 text-lg font-bold">지갑정보 조회중...</p>
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
      return EXCHANGE.BINANCE.NAME;
    case 'bithumb':
      return EXCHANGE.BITHUMB.NAME;
    case 'upbit':
      return EXCHANGE.UPBIT.NAME;
    case 'bitget':
      return EXCHANGE.BITGET.NAME;
    case 'okx':
      return EXCHANGE.OKX.NAME;
    case 'okx_spot':
      return EXCHANGE.OKX_SPOT.NAME;
    case 'binance_spot':
      return EXCHANGE.BINANCE_SPOT.NAME;
    case 'bitget_spot':
      return EXCHANGE.BITGET_SPOT.NAME;
    default:
      throw new Error('Invalid exchange');
  }
}

function getBalance(wallet: Wallet | undefined): number {
  return wallet?.walletBalance ?? 0;
}

function formatBalance(balance: number, exchange: Exchange): string {
  switch (exchange) {
    case 'binance':
      return formatNum({
        num: balance,
        precision: 1,
        currencySymbol: 'USDT',
      });
    case 'upbit':
      return formatNum({
        num: balance,
        precision: 1,
        currencySymbol: '₩',
      });
    case 'bithumb':
      return formatNum({
        num: balance,
        precision: 1,
        currencySymbol: '₩',
      });
    case 'bitget':
      return formatNum({
        num: balance,
        precision: 1,
        currencySymbol: 'USDT',
      });
    case 'okx':
      return formatNum({
        num: balance,
        precision: 1,
        currencySymbol: 'USDT',
      });
    case 'bitget_spot':
      return formatNum({
        num: balance,
        precision: 1,
        currencySymbol: 'USDT',
      });
    case 'okx_spot':
      return formatNum({
        num: balance,
        precision: 1,
        currencySymbol: 'USDT',
      });
    case 'binance_spot':
      return formatNum({
        num: balance,
        precision: 1,
        currencySymbol: 'USDT',
      });
  }
}

function buildBalanceDescription(exchange: Exchange) {
  switch (exchange) {
    case 'binance':
    case 'bitget':
    case 'okx':
    case 'okx_spot':
    case 'binance_spot':
    case 'bitget_spot':
      return '보유 USDT';

    case 'bithumb':
    case 'upbit':
      return '보유 KRW';
  }
}

function buildTotalUnrealizedProfit({
  exchange,
  wallet,
}: {
  exchange: Exchange;
  wallet: Wallet | undefined;
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

    case 'bitget':
      return formatNum({
        num: totalUnrealizedProfit,
        precision: 1,
        currencySymbol: 'USDT',
      });
    case 'okx':
      return formatNum({
        num: totalUnrealizedProfit,
        precision: 1,
        currencySymbol: 'USDT',
      });
    case 'bitget_spot':
      return formatNum({
        num: totalUnrealizedProfit,
        precision: 1,
        currencySymbol: 'USDT',
      });
    case 'okx_spot':
      return formatNum({
        num: totalUnrealizedProfit,
        precision: 1,
        currencySymbol: 'USDT',
      });
    case 'binance_spot':
      return formatNum({
        num: totalUnrealizedProfit,
        precision: 1,
        currencySymbol: 'USDT',
      });

    default:
      return null;
  }
}
function buildTotalBalance({ exchange, wallet }: { exchange: Exchange; wallet: Wallet | undefined }): string {
  const validTotalBalance = z.number().safeParse(wallet?.totalBalance);
  if (!validTotalBalance.success) {
    return 'Unknown';
  }

  const totalBalance = validTotalBalance.data;
  switch (exchange) {
    case 'binance':
    case 'bitget':
    case 'okx':
    case 'okx_spot':
    case 'binance_spot':
    case 'bitget_spot':
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
      return 'Unknown';
  }
}
