import { z } from 'zod';
import { Asset, Exchange } from '@/types/exchangeTypes.ts';
import { fetchPositions } from '@/components/api/desktopClient.ts';
import { useQuery } from '@tanstack/react-query';
import {
  BinancePositionsResponse,
  BitgetPositionsResponse,
  OkxPositionsResponse,
  BithumbPositionsResponse,
  PositionsResponse,
  UpbitPositionsResponse,
} from '@/types/backendTypes.ts';
import { useExchangeStore } from '@/store/exchangeStore.ts';
import { TradingDataResponseSchema, TradingDataSchema } from '@/schemas/backendSchema';
import { useFetchTradingData } from '@/hooks/useFetchTradingData.ts';
import { toast } from '@/components/ui/use-toast.ts';

export const useFetchPositions = (exchange: Exchange, refetchInterval?: number) => {
  return useQuery({
    queryKey: ['positions', exchange],
    queryFn: () => fetchPositions(exchange),
    refetchInterval: refetchInterval ?? 1000,
  });
};

export const useAssetsData = (): { isLoading: boolean; assets: Asset[] } => {
  const { exchange } = useExchangeStore();
  const positionsQuery = useFetchPositions(exchange);
  const symbols = buildMarketSymbols(exchange, positionsQuery.data);
  const tradingDataQuery = useFetchTradingData({ exchange, symbols });

  if (positionsQuery.error) {
    console.log(`Error fetching positions: ${positionsQuery.error}`);
    toast({ title: `${positionsQuery.error.name}`, description: `${positionsQuery.error.message}` });
  }

  if (positionsQuery.isLoading || !positionsQuery.data) {
    return {
      isLoading: true,
      assets: [],
    };
  }

  if (tradingDataQuery.isError) {
    console.error(`[BACKEND TRADING DATA QUERY]`, tradingDataQuery.error.message);
    toast({
      title: '매매 내역 조회에 실패했습니다.',
      description: <p className="whitespace-pre-wrap">{tradingDataQuery.error.message}</p>,
      variant: 'destructive',
    });
  }

  if (positionsQuery.isError) {
    console.error(`[BACKEND POSITIONS QUERY]`, positionsQuery.error.message);
    toast({
      title: '포지션 조회에 실패했습니다.',
      description: <p className="whitespace-pre-wrap">{positionsQuery.error.message}</p>,
      variant: 'destructive',
    });
  }

  switch (exchange) {
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
    case 'bitget':
      return {
        isLoading: false,
        assets: buildBitgetAssets(positionsQuery.data as BitgetPositionsResponse[], tradingDataQuery.data ?? []),
      };
    case 'okx':
      return {
        isLoading: false,
        assets: buildOkxAssets(positionsQuery.data as OkxPositionsResponse[], tradingDataQuery.data ?? []),
      };
    default:
      return {
        isLoading: false,
        assets: [],
      };
  }
};

export function buildMarketSymbols(exchange: Exchange, positions?: PositionsResponse[]): string[] {
  switch (exchange) {
    case 'okx':
      return buildOkxSymbols(positions as OkxPositionsResponse[]);
    case 'okx_spot':
      return buildOkxSymbols(positions as OkxPositionsResponse[]);
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

// Todo: Impl
function buildBitgetSymbol(currency: string) {
  return currency;
}

// Todo: Impl
export function buildBitgetSymbols(positions?: BitgetPositionsResponse[]): string[] {
  if (!positions) {
    return [];
  }

  return positions.map((position) => buildBitgetSymbol(position.currency));
}

// Todo: Impl
function buildOkxSymbol(currency: string) {
  return currency;
}

// Todo: Impl
export function buildOkxSymbols(positions?: OkxPositionsResponse[]): string[] {
  if (!positions) {
    return [];
  }

  return positions.map((position) => buildOkxSymbol(position.currency));
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

function buildBithumbSymbol(currency: string) {
  return currency;
}

export function buildBithumbSymbols(positions?: BithumbPositionsResponse[]): string[] {
  if (!positions) {
    return [];
  }

  return positions.map((position) => buildBithumbSymbol(position.currency));
}



function buildBinanceAssets(
  positions: BinancePositionsResponse[],
  tradingData: z.infer<typeof TradingDataResponseSchema>[],
): Asset[] {
  const tradingDataWithKey = tradingData.reduce(
    (acc, item) => {
      return {
        ...acc,
        [item.symbol]: item,
      };
    },
    {} as Record<string, z.infer<typeof TradingDataResponseSchema>>,
  );

  const assets: Asset[] = positions.map((coin) => {
    const key = coin.symbol;
    const amount = coin.quantity.toString();
    const coinName = coin.symbol;
    const currentPrice = coin.mark_price;
    const initPrice = coin.entry_price;
    const rateOfReturn = +coin.profit_percent.toFixed(2);
    const value = coin.value;

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

function buildBithumbAssets(
  positions: BithumbPositionsResponse[],
  tradingData: z.infer<typeof TradingDataResponseSchema>[],
): Asset[] {
  const tradingDataWithKey = tradingData.reduce(
    (acc, item) => {
      return {
        ...acc,
        [item.symbol]: item,
      };
    },
    {} as Record<string, z.infer<typeof TradingDataResponseSchema>>,
  );

  const assets: Asset[] = positions.map((coin) => {
    const key = coin.currency;
    const coinName = coin.currency;
    const amount = coin.balance;
    const currentPrice = coin.current_price;
    const initPrice = 0;
    const rateOfReturn = 0;
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

// Todo: Impl
function buildBitgetAssets(
  positions: BitgetPositionsResponse[],
  tradingData: z.infer<typeof TradingDataResponseSchema>[],
): Asset[] {
  const tradingDataWithKey = tradingData.reduce(
    (acc, item) => {
      return {
        ...acc,
        [item.symbol]: item,
      };
    },
    {} as Record<string, z.infer<typeof TradingDataResponseSchema>>,
  );

  const assets: Asset[] = positions.map((coin) => {
    const key = coin.currency;
    const coinName = coin.currency;
    const amount = coin.balance;
    const currentPrice = coin.current_price;
    const initPrice = 0;
    const rateOfReturn = 0;
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

// Todo: Impl
function buildOkxAssets(
  positions: OkxPositionsResponse[],
  tradingData: z.infer<typeof TradingDataResponseSchema>[],
): Asset[] {
  const tradingDataWithKey = tradingData.reduce(
    (acc, item) => {
      return {
        ...acc,
        [item.symbol]: item,
      };
    },
    {} as Record<string, z.infer<typeof TradingDataResponseSchema>>,
  );

  const assets: Asset[] = positions.map((coin) => {
    const key = coin.currency;
    const coinName = coin.currency;
    const amount = coin.balance;
    const currentPrice = coin.current_price;
    const initPrice = 0;
    const rateOfReturn = 0;
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

function buildUpbitAssets(
  positions: UpbitPositionsResponse[],
  tradingData: z.infer<typeof TradingDataResponseSchema>[],
): Asset[] {
  const tradingDataWithKey = tradingData.reduce(
    (acc, item) => {
      return {
        ...acc,
        [item.symbol]: item,
      };
    },
    {} as Record<string, z.infer<typeof TradingDataResponseSchema>>,
  );

  const assets: Asset[] = positions.map((coin) => {
    const key = coin.currency;
    const coinName = coin.currency;
    const amount = coin.balance;
    const currentPrice = coin.current_price;
    const initPrice = +coin.avg_buy_price;
    const rateOfReturn = +(+(((currentPrice - initPrice) / initPrice) * 100)).toFixed(2);
    const value = Math.abs(+amount * currentPrice);

    const validatedTradingData = TradingDataSchema.safeParse(tradingData);
    if (validatedTradingData.success) {
      return {
        key,
        amount: (+amount).toFixed(7),
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
        amount: (+amount).toFixed(7),
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
