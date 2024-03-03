import { useWallet } from '@/hooks/useWallet.ts';
import { AssetsSchemaWithKey } from '@/schemas/exchangeSchema.ts';
import { z } from 'zod';
import { UpbitWalletSchema } from '@/schemas/upbitSchema.ts';
import { BinanceWalletSchema } from '@/schemas/binanceSchema.ts';
import { BithumbWalletSchema } from '@/schemas/bithumbSchema.ts';
import { useUpbitAccessToken } from '@/hooks/useUpbitAccessToken.ts';
import { useUpbitWebSocket } from '@/hooks/useUpbitWebsocket.ts';
import { buildUpbitSymbols } from '@/components/table/UseUpbitAssets.tsx';
import { TradingDataSchema } from '@/schemas/backendSchema.ts';
import { useFetchUpbitTradingData } from '@/hooks/useFetchUpbitTradingData.ts';

export const useAssetsData = (): { isLoading: boolean; assets: z.infer<typeof AssetsSchemaWithKey>[] } => {
  const { isLoading, data: wallet } = useWallet();

  if (isLoading) {
    return { isLoading, assets: [] };
  }

  switch (wallet?.exchange) {
    case 'upbit':
      return {
        isLoading: false,
        assets: buildUpbitAssets(wallet),
        // assets: buildUpbitAssets(wallet, upbitTickers),
      };
    case 'binance':
      return {
        isLoading: false,
        assets: buildBinanaceAssets(wallet),
      };
    case 'bithumb':
      return {
        isLoading: false,
        assets: buildBithumbAssets(wallet),
      };
    default:
      return {
        isLoading: false,
        assets: [],
      };
  }
};
// export const useAssetsData = () => {
//
//   const params = useParams();
//   const { exchange } = TradingSearchParamsSchema.parse(params);
//
//   return useQuery({
//     queryKey: ['assetsData', exchange],
//     queryFn: getAssetsData,
//     refetchInterval: ASSETS_FETCH_INTERVAL_MS,
//   });
// };

function buildUpbitAssets(wallet: z.infer<typeof UpbitWalletSchema>): z.infer<typeof AssetsSchemaWithKey>[] {
  const { withOutKrw } = wallet;
  const accessTokenQuery = useUpbitAccessToken();
  const symbols = buildUpbitSymbols(wallet);
  const { upbitTickers: tickers } = useUpbitWebSocket({
    symbols,
    accessToken: accessTokenQuery.data ?? '',
  });
  const upbitTradingDataQuery = useFetchUpbitTradingData('upbit', symbols);

  if (!withOutKrw || withOutKrw.length === 0 || !upbitTradingDataQuery.data) {
    return [];
  }

  console.log(`[TICKERS]`, tickers);
  if (Object.keys(tickers).length === 0) {
    return [];
  }

  const assets: z.infer<typeof AssetsSchemaWithKey>[] = withOutKrw.map((item) => {
    console.log(`[ASSETS]`, item, tickers[item.key]);
    const ticker = tickers[item.key];
    const initPrice = +item.avg_buy_price;
    const currentPrice = ticker ? ticker.trade_price : 0;
    const amount = item.balance;
    const rateOfReturn = +(((currentPrice - initPrice) / initPrice) * 100);
    const fixedRateOfReturn = Number.isNaN(rateOfReturn) ? 0 : +rateOfReturn.toFixed();
    const value = Math.abs(+amount * currentPrice);

    // Fetch from DB
    const tradingData = TradingDataSchema.safeParse(upbitTradingDataQuery.data);
    if (tradingData.success) {
      return {
        key: item.key,
        coinName: item.currency,
        initPrice,
        currentPrice,
        amount,
        rateOfReturn: fixedRateOfReturn,
        sellPrice: tradingData.data.long_sl_price.toFixed(2),
        tp1: tradingData.data.long_tp1_price.toFixed(2),
        tp2: tradingData.data.long_tp2_price.toFixed(2),
        tp3: tradingData.data.long_tp3_price.toFixed(2),
        value,
      };
    } else {
      return {
        key: item.key,
        coinName: item.currency,
        initPrice,
        currentPrice,
        amount,
        rateOfReturn: fixedRateOfReturn,
        sellPrice: '',
        tp1: '',
        tp2: '',
        tp3: '',
        value,
      };
    }
  });

  return assets;
}

function buildBinanaceAssets(wallet: z.infer<typeof BinanceWalletSchema>): z.infer<typeof AssetsSchemaWithKey>[] {
  return [];
}

function buildBithumbAssets(wallet: z.infer<typeof BithumbWalletSchema>): z.infer<typeof AssetsSchemaWithKey>[] {
  return [];
}
