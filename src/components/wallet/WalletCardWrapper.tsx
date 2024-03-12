import WalletCardContent from '@/components/wallet/WalletCardContent.tsx';
import WalletCard from '@/components/wallet/WalletCard.tsx';
import { useWallet } from '@/hooks/useWallet.ts';
import { Exchange, Wallet } from '@/types/exchangeTypes.ts';
import { Icons } from '@/components/common/Icons.tsx';

type Props = { className?: string };

export default function WalletCardWrapper({ className }: Props) {
  console.log(`[RENDER WALLET CARD WRAPPER]`);
  const { isLoading, data: wallet } = useWallet();

  if (!wallet) {
    return <Icons.spinner />;
  }

  const title = getExchangeName(wallet.exchange);
  const balance = buildBalanceString(wallet);

  return (
    <WalletCard className={className} title={title} description={'지갑 정보'}>
      <WalletCardContent balance={balance} />
    </WalletCard>
  );
}

function getExchangeName(exchange: Exchange) {
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
      return `${wallet.krw.balance} 원`;
    // case 'bithumb':
    // Todo Impl
    default:
      return `Unknown`;
  }
}

// 수익률/100x보유수량x현재가격
function buildUnrealizedProfit({
  profit,
  quantity,
  currentPrice,
}: {
  profit: number;
  quantity: number;
  currentPrice: number;
}) {}
