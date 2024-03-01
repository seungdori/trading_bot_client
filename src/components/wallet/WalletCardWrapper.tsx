import WalletCardContent from '@/components/wallet/WalletCardContent.tsx';
import WalletCard from '@/components/wallet/WalletCard.tsx';
import { useStrategyStore } from '@/hooks/useStrategyStore.ts';
import { z } from 'zod';
import { ExchangeSchema } from '@/schemas/exchangeSchema.ts';

export default function WalletCardWrapper() {
  const strategyStore = useStrategyStore();
  const title = getExchangeName(strategyStore.exchange);
  const balance = '$258.71';

  return (
    <WalletCard title={title} description={'지갑 정보'}>
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
