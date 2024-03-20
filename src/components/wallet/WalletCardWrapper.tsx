import WalletCardContent from '@/components/wallet/WalletCardContent.tsx';
import WalletCard from '@/components/wallet/WalletCard.tsx';
import { useWallet } from '@/hooks/useWallet.ts';
import { Asset, Exchange, Wallet } from '@/types/exchangeTypes.ts';
import { Icons } from '@/components/common/Icons.tsx';
import { toast } from '@/components/ui/use-toast.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';
import { useAssetsData } from '@/hooks/useAssetsData.ts';

type Props = { className?: string };

export default function WalletCardWrapper({ className }: Props) {
  const { exchange } = useExchangeStore();
  const { isLoading, data: wallet, error } = useWallet();
  const { assets } = useAssetsData();

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
  const balance = buildBalanceString(wallet);
  const unrealizedProfit = buildTotalUnrealizedProfit(assets);

  return (
    <WalletCard className={className} title={title} description={'지갑 정보'}>
      <WalletCardContent balance={balance} unrealizedProfit={unrealizedProfit.toFixed(2)} />
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

function buildBalanceString(wallet: Wallet | undefined) {
  switch (wallet?.exchange) {
    case 'binance':
      return `${wallet.usdt.free} USDT`;
    case 'upbit':
      return `${(+wallet.krw.balance).toFixed(1)} 원`;
    case 'bithumb':
      return `${(+wallet.krw).toFixed(1)} 원`;
    default:
      return `Unknown`;
  }
}

function buildTotalUnrealizedProfit(assets: Asset[]): number {
  const unrealizedProfits = assets.map((asset) => {
    return calculateUnrealizedProfit({
      profit: asset.rateOfReturn,
      quantity: +asset.amount,
      currentPrice: asset.currentPrice,
    });
  });

  return unrealizedProfits.reduce((acc, cur) => acc + cur, 0);
}

// 수익률/100x보유수량x현재가격
function calculateUnrealizedProfit({
  profit,
  quantity,
  currentPrice,
}: {
  profit: number;
  quantity: number;
  currentPrice: number;
}): number {
  return (profit / 100) * quantity * currentPrice;
}
