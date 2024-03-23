import WalletCardContent from '@/components/wallet/WalletCardContent.tsx';
import WalletCard from '@/components/wallet/WalletCard.tsx';
import { useWallet } from '@/hooks/useWallet.ts';
import { Asset, Exchange, Wallet_v2 } from '@/types/exchangeTypes.ts';
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
  // const balance = getBalance(wallet);
  const balance = getBalance_v2(wallet);
  const formattedBalance = formatBalance(balance, exchange);
  const balanceDescription = buildBalanceDescription(exchange);
  const unrealizedProfit = buildTotalUnrealizedProfit_v2({ exchange, wallet, assets });
  // const unrealizedProfit = buildTotalUnrealizedProfit(exchange, assets);
  const totalBalance = buildTotalBalance_v2({ exchange, balance, wallet, assets });
  // const totalBalance = buildTotalBalance(exchange, balance, assets);

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

function getBalance_v2(wallet: Wallet_v2 | undefined): number {
  return wallet?.walletBalance ?? 0;
}

function formatBalance(balance: number, exchange: Exchange): string {
  switch (exchange) {
    case 'binance':
      return `${formatNum(balance)} USDT`;
    case 'upbit':
      return `${formatNum(balance)} ₩`;
    case 'bithumb':
      return `${formatNum(balance)} ₩`;
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

function buildTotalUnrealizedProfit_v2({
  exchange,
  wallet,
  assets,
}: {
  exchange: Exchange;
  wallet: Wallet_v2 | undefined;
  assets: Asset[];
}): string | null {
  if (wallet?.totalUnrealizedProfit) {
    return formatNum(wallet.totalUnrealizedProfit, 1);
  }

  const unrealizedProfits = assets.map((asset) => {
    return calculateUnrealizedProfit_v2({
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
      return `${formattedTotalUnrealizedProfit} ₩`;

    case 'bithumb':
      return null;
    default:
      return null;
  }
}

// 수익률/100x보유수량x현재가격
function calculateUnrealizedProfit_v2({
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

function buildTotalBalance_v2({
  exchange,
  balance,
  wallet,
  assets,
}: {
  exchange: Exchange;
  balance: number;
  wallet: Wallet_v2 | undefined;
  assets: Asset[];
}): string | null {
  if (wallet?.totalBalance) {
    return formatNum(wallet.totalBalance, 1);
  }

  const totalBalance = calculateTotalBalance_v2(exchange, balance, assets);
  const formattedTotalBalance = formatNum(totalBalance, 1);

  switch (exchange) {
    case 'binance':
      return null; // Todo: assert binance

    case 'upbit':
    case 'bithumb':
      return `${formattedTotalBalance} ₩`;

    default:
      return `${formattedTotalBalance}`;
  }
}

/**
 * @description Calculate total balance.
 * @param {Exchange} exchange
 * @param {number} balance - main balance (KRW, USDT)
 * @param {Asset[]} assets - assets from exchange
 * @returns {number} total balance - converted to KRW or USDT
 */
function calculateTotalBalance_v2(exchange: Exchange, balance: number, assets: Asset[]): number {
  switch (exchange) {
    case 'upbit':
    case 'bithumb':
      return assets.reduce((acc, cur) => {
        return acc + cur.currentPrice * +cur.amount;
      }, balance);

    case 'binance':
    default:
      return balance;
  }
}

// Todo: remove
// function getBalance(wallet: Wallet | undefined): number {
//   switch (wallet?.exchange) {
//     case 'binance':
//       return +wallet.usdt.free;
//     case 'upbit':
//       return +wallet.krw.balance;
//     case 'bithumb':
//       return +wallet.krw;
//     default:
//       return 0;
//   }
// }
//

// function buildTotalBalance(exchange: Exchange, balance: number, assets: Asset[]): string | null {
//   const totalBalance = calculateTotalBalance(exchange, balance, assets);
//   const formattedTotalBalance = formatNum(totalBalance, 1);
//
//   switch (exchange) {
//     case 'binance':
//       return null; // Todo: check
//
//     case 'upbit':
//     case 'bithumb':
//       return `${formattedTotalBalance} ₩`;
//
//     default:
//       return `${formattedTotalBalance}`;
//   }
// }
//
// /**
//  * @description Calculate total balance.
//  * @param {Exchange} exchange
//  * @param {number} balance - main balance (KRW, USDT)
//  * @param {Asset[]} assets - assets from exchange
//  * @returns {number} total balance - converted to KRW or USDT
//  */
// function calculateTotalBalance(exchange: Exchange, balance: number, assets: Asset[]): number {
//   switch (exchange) {
//     case 'upbit':
//     case 'bithumb':
//       return assets.reduce((acc, cur) => {
//         return acc + cur.currentPrice * +cur.amount;
//       }, balance);
//
//     case 'binance':
//     default:
//       return balance;
//   }
// }

// function buildTotalUnrealizedProfit(exchange: Exchange, assets: Asset[]): string {
//   const unrealizedProfits = assets.map((asset) => {
//     return calculateUnrealizedProfit({
//       profit: asset.rateOfReturn,
//       quantity: +asset.amount,
//       currentPrice: asset.currentPrice,
//     });
//   });
//
//   const totalUnrealizedProfit = unrealizedProfits.reduce((acc, cur) => acc + cur, 0);
//   const formattedTotalUnrealizedProfit = formatNum(totalUnrealizedProfit, 1);
//
//   switch (exchange) {
//     case 'binance':
//       return `${formattedTotalUnrealizedProfit} USDT`; // Todo: uncomment
//
//     case 'upbit':
//     case 'bithumb':
//       return `${formattedTotalUnrealizedProfit} ₩`;
//
//     default:
//       return formattedTotalUnrealizedProfit;
//   }
// }
//
// // 수익률/100x보유수량x현재가격
// function calculateUnrealizedProfit({
//   profit,
//   quantity,
//   currentPrice,
// }: {
//   profit: number;
//   quantity: number;
//   currentPrice: number;
// }): number {
//   return (profit / 100) * quantity * currentPrice;
// }
