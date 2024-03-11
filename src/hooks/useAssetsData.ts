import { useWallet } from '@/hooks/useWallet.ts';
import { AssetsSchemaWithKey } from '@/schemas/exchangeSchema.ts';
import { z } from 'zod';
import { TradingDataResponseSchema, TradingDataSchema } from '@/schemas/backendSchema.ts';
import { useFetchTradingData } from '@/hooks/useFetchTradingData.ts';
import { Wallet } from '@/types/exchangeTypes.ts';
import { fetchPositions } from '@/components/api/desktopClient.ts';
import { useQuery } from '@tanstack/react-query';
import {
  BinancePositionsResponse,
  BithumbPositionsResponse,
  PositionsResponse,
  UpbitPositionsResponse,
} from '@/types/backendTypes.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';

export const useFetchPositions = ({ wallet }: { wallet?: Wallet }) => {
  return useQuery({
    queryKey: ['positions', wallet?.exchange],
    queryFn: () => fetchPositions({ wallet }),
    refetchInterval: 1000,
  });
};

export const useAssetsData = (): { isLoading: boolean; assets: z.infer<typeof AssetsSchemaWithKey>[] } => {
  const { exchange } = useExchangeStore();
  const { data: wallet } = useWallet();
  const positionsQuery = useFetchPositions({ wallet });
  const symbols = buildMarketSymbols(exchange, positionsQuery.data);
  const tradingDataQuery = useFetchTradingData({ exchange, symbols });

  if (positionsQuery.isLoading || !positionsQuery.data) {
    return {
      isLoading: true,
      assets: [],
    };
  }

  switch (wallet?.exchange) {
    case 'upbit':
      return {
        isLoading: false,
        assets: buildUpbitAssets(positionsQuery.data as UpbitPositionsResponse[], tradingDataQuery.data ?? []),
      };
    case 'binance':
      return {
        isLoading: false,
        assets: buildBinanceAssets(positionsQuery.data as BinancePositionsResponse[], tradingDataQuery.data ?? []),
      };
    case 'bithumb':
      return {
        isLoading: false,
        assets: buildBithumbAssets(positionsQuery.data as BithumbPositionsResponse[], tradingDataQuery.data ?? []),
      };
    default:
      return {
        isLoading: false,
        assets: [],
      };
  }
};

export function buildMarketSymbols(exchange: Wallet['exchange'], positions?: PositionsResponse[]): string[] {
  switch (exchange) {
    case 'upbit':
      return buildUpbitSymbols(positions as UpbitPositionsResponse[]);
    case 'binance':
      return buildBinanceSymbols(positions as BinancePositionsResponse[]);
    case 'bithumb':
      return []; // Todo: impl
    default:
      return [];
  }
}

function buildUpbitSymbol(currency: string) {
  return currency;
}

// e.g. ['BTC', 'ETH', 'DOGE'];
export function buildUpbitSymbols(positions?: UpbitPositionsResponse[]): string[] {
  if (!positions) {
    return [];
  }

  return positions.map((position) => buildUpbitSymbol(position.currency));
}

function buildBinanceSymbol(symbol: string) {
  return symbol;
}

export function buildBinanceSymbols(positions?: BinancePositionsResponse[]): string[] {
  if (!positions) {
    return [];
  }

  return positions.map((position) => buildBinanceSymbol(position.symbol));
}

function buildUpbitAssets(
  positions: UpbitPositionsResponse[],
  tradingData: z.infer<typeof TradingDataResponseSchema>[],
): z.infer<typeof AssetsSchemaWithKey>[] {
  const tradingDataWithKey = tradingData.reduce(
    (acc, item) => {
      return {
        ...acc,
        [item.symbol]: item,
      };
    },
    {} as Record<string, z.infer<typeof TradingDataResponseSchema>>,
  );

  const assets: z.infer<typeof AssetsSchemaWithKey>[] = positions.map((coin) => {
    const key = coin.currency;
    const coinName = coin.currency;
    const amount = coin.balance;
    const currentPrice = coin.current_price;
    const initPrice = +coin.avg_buy_price;
    const rateOfReturn = +(((currentPrice - initPrice) / initPrice) * 100);
    const value = Math.abs(+amount * currentPrice);

    const validatedTradingData = TradingDataSchema.safeParse(tradingData);
    if (validatedTradingData.success) {
      return {
        key,
        amount,
        coinName,
        currentPrice,
        initPrice,
        rateOfReturn,
        sellPrice: tradingDataWithKey[key].long_sl_price.toFixed(2),
        tp1: tradingDataWithKey[key].long_tp1_price.toFixed(2),
        tp2: tradingDataWithKey[key].long_tp2_price.toFixed(2),
        tp3: tradingDataWithKey[key].long_tp3_price.toFixed(2),
        value,
      };
    } else {
      return {
        key,
        amount,
        coinName,
        currentPrice,
        initPrice,
        rateOfReturn,
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
function buildBinanceAssets(
  positions: BinancePositionsResponse[],
  tradingData: z.infer<typeof TradingDataResponseSchema>[],
): z.infer<typeof AssetsSchemaWithKey>[] {
  const tradingDataWithKey = tradingData.reduce(
    (acc, item) => {
      return {
        ...acc,
        [item.symbol]: item,
      };
    },
    {} as Record<string, z.infer<typeof TradingDataResponseSchema>>,
  );

  const assets: z.infer<typeof AssetsSchemaWithKey>[] = positions.map((coin) => {
    const amount = coin.quantity.toString();
    const coinName = coin.symbol;
    const currentPrice = coin.mark_price;
    const initPrice = coin.entry_price;
    const key = coin.symbol;
    const rateOfReturn = coin.profit_percent;
    const value = coin.value;

    const validatedTradingData = TradingDataSchema.safeParse(coin.trading_data);
    if (validatedTradingData.success) {
      return {
        key,
        amount,
        coinName,
        currentPrice,
        initPrice,
        rateOfReturn,
        sellPrice: tradingDataWithKey[key].long_sl_price.toFixed(2),
        tp1: tradingDataWithKey[key].long_tp1_price.toFixed(2),
        tp2: tradingDataWithKey[key].long_tp2_price.toFixed(2),
        tp3: tradingDataWithKey[key].long_tp3_price.toFixed(2),
        value,
      };
    } else {
      return {
        key,
        amount,
        coinName,
        currentPrice,
        initPrice,
        rateOfReturn,
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

function buildBithumbAssets(
  positions: BithumbPositionsResponse[],
  tradingData: z.infer<typeof TradingDataResponseSchema>[],
): z.infer<typeof AssetsSchemaWithKey>[] {
  return [];
}
