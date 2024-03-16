import WalletCardContent from '@/components/wallet/WalletCardContent.tsx';
import WalletCard from '@/components/wallet/WalletCard.tsx';
import { useWallet } from '@/hooks/useWallet.ts';
import { Exchange, Wallet } from '@/types/exchangeTypes.ts';
import { Icons } from '@/components/common/Icons.tsx';

type Props = { className?: string };

export default function WalletCardWrapper({ className }: Props) {
  console.log(`[RENDER WALLET CARD WRAPPER]`);
  const { data: wallet } = useWallet();

  if (!wallet) {
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Icons.spinner className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  const title = buildExchangeName(wallet.exchange);
  const balance = buildBalanceString(wallet);

  return (
    <WalletCard className={className} title={title} description={'지갑 정보'}>
      <WalletCardContent balance={balance} />
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

// 수익률/100x보유수량x현재가격
// function buildUnrealizedProfit({
//   profit,
//   quantity,
//   currentPrice,
// }: {
//   profit: number;
//   quantity: number;
//   currentPrice: number;
// }) {}
