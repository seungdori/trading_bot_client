import WalletCardContent from '@/components/wallet/WalletCardContent.tsx';
import WalletCard from '@/components/wallet/WalletCard.tsx';
import { useWallet } from '@/hooks/useWallet.ts';
import { Asset, Exchange, Wallet } from '@/types/exchangeTypes.ts';
import { Icons } from '@/components/common/Icons.tsx';
import { toast } from '@/components/ui/use-toast.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';
import { useAssetsData } from '@/hooks/useAssetsData.ts';
import { formatNum } from '@/lib/format.ts';

type Props = { className?: string };

export default function WalletCardWrapper({ className }: Props) {
  const { exchange } = useExchangeStore();
  const { isLoading, data: wallet, error } = useWallet({ exchange });
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
  const balanceDescription = buildBalanceDescription(exchange);
  const unrealizedProfit = buildTotalUnrealizedProfit(exchange, assets);
  const totalBalance = buildTotalBalance(exchange, assets);

  return (
    <WalletCard className={className} title={title} description={'지갑 정보'}>
      <WalletCardContent
        balance={balance}
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

function buildBalanceString(wallet: Wallet | undefined) {
  switch (wallet?.exchange) {
    case 'binance':
      return `${formatNum(+wallet.usdt.free, 1)} USDT`;
    case 'upbit':
      return `${formatNum(+wallet.krw.balance, 1)} ₩`;
    case 'bithumb':
      return `${formatNum(+wallet.krw, 1)} ₩`;
    default:
      return `Unknown`;
  }
}

function buildBalanceDescription(exchange: Exchange) {
  switch (exchange) {
    case 'binance':
      return 'USDT 잔고';
    case 'upbit':
      return 'KRW 잔고';
    case 'bithumb':
      return 'KRW 잔고';
    default:
      return 'Unknown';
  }
}

function buildTotalBalance(exchange: Exchange, assets: Asset[]): string | null {
  const totalBalance = calculateTotalBalance(exchange, assets);
  const formattedTotalBalance = formatNum(totalBalance, 1);

  switch (exchange) {
    case 'binance':
      return null;

    case 'upbit':
    case 'bithumb':
      return `${formattedTotalBalance} ₩`;

    default:
      return `${formattedTotalBalance}`;
  }
}

function calculateTotalBalance(exchange: Exchange, assets: Asset[]): number {
  switch (exchange) {
    case 'upbit':
    case 'bithumb':
      return assets.reduce((acc, cur) => {
        return acc + cur.currentPrice * +cur.amount;
      }, 0);

    case 'binance':
    default:
      return 0;
  }
}

function buildTotalUnrealizedProfit(exchange: Exchange, assets: Asset[]): string {
  const unrealizedProfits = assets.map((asset) => {
    return calculateUnrealizedProfit({
      profit: asset.rateOfReturn,
      quantity: +asset.amount,
      currentPrice: asset.currentPrice,
    });
  });

  const totalUnrealizedProfit = unrealizedProfits.reduce((acc, cur) => acc + cur, 0);
  const formattedTotalUnrealizedProfit = formatNum(totalUnrealizedProfit, 1);

  switch (exchange) {
    case 'binance':
      return `${formattedTotalUnrealizedProfit} USDT`; // Todo: uncomment

    case 'upbit':
    case 'bithumb':
      return `${formattedTotalUnrealizedProfit} ₩`;

    default:
      return formattedTotalUnrealizedProfit;
  }
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
