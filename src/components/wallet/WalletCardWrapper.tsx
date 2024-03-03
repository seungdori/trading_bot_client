import WalletCardContent from '@/components/wallet/WalletCardContent.tsx';
import WalletCard from '@/components/wallet/WalletCard.tsx';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';
import { z } from 'zod';
import { ExchangeSchema } from '@/schemas/exchangeSchema.ts';
import { useWallet } from '@/hooks/useWallet.ts';

type Props = { className?: string };

export default function WalletCardWrapper({ className }: Props) {
  const strategyStore = useStrategyStore();
  const { isLoading, data: wallet } = useWallet();

  const title = getExchangeName(strategyStore.exchange);
  const mockBalance = '1000000';
  const balance = wallet?.exchange !== 'upbit' ? mockBalance : wallet.krw.balance;

  return (
    <WalletCard className={className} title={title} description={'지갑 정보'}>
      <WalletCardContent balance={balance} />
    </WalletCard>
  );
}

function getExchangeName(exchange: z.infer<typeof ExchangeSchema>) {
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
