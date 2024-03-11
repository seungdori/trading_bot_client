import { z } from 'zod';
import { useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import * as uuid from 'uuid';
import { BINANCE_API_ACCESS_KEY, BINANCE_API_WEBSOCKET_BASE_URL } from '@/constants/binance.ts';
import { BinanceWebScoketRequestPayloadSchema, BinanceWebSocketRequestSchema } from '@/schemas/binanceSchema.ts';
import { createBinanceSignature } from '@/components/api/binanceClient.ts';

type BinanceTickerWithKey = Record<string, any>;

export const useBinanceWebSocket = () => {
  const [binanceTickers, setBinanceTickers] = useState<BinanceTickerWithKey>({});
  const { sendMessage, lastMessage, readyState } = useWebSocket(BINANCE_API_WEBSOCKET_BASE_URL, {
    onError: (e) => console.error('[WS ERROR]', e),
    retryOnError: false,
    reconnectAttempts: 5,
    shouldReconnect: () => true,
  });

  useEffect(() => {
    const fetchAccountStatus = async () => {
      const requestPayload: z.infer<typeof BinanceWebScoketRequestPayloadSchema> = {
        recvWindow: 30000,
        timestamp: Date.now(),
        apiKey: BINANCE_API_ACCESS_KEY,
      };
      // const testRequestPayload: z.infer<typeof BinanceWebScoketRequestPayloadSchema> = {
      //   symbol: 'BTCUSDT',
      //   side: 'SELL',
      //   type: 'LIMIT',
      //   timeInForce: 'GTC',
      //   price: '23416.10000000',
      //   quantity: '0.00847000',
      //   apiKey: BINANCE_API_ACCESS_KEY,
      //   timestamp: Date.now(),
      // };
      const signature = await createBinanceSignature(requestPayload);
      // const signature = await createBinanceSignature(testRequestPayload);
      // const testRequest = {
      //   id: uuid.v4(),
      //   method: 'order.test',
      //   params: {
      //     ...testRequestPayload,
      //     signature,
      //   },
      // };
      const request: z.infer<typeof BinanceWebSocketRequestSchema> = {
        id: uuid.v4(),
        method: 'account.status',
        params: {
          ...requestPayload,
          signature,
        },
      };
      sendMessage(JSON.stringify(request));
      // sendMessage(JSON.stringify(testRequest));
    };

    fetchAccountStatus();
  }, []);

  useEffect(() => {
    const handleMessage = async () => {
      if (lastMessage !== null) {
        const data: Record<string, any> = JSON.parse(lastMessage.data);
        console.log('[BINANCE WS MESSAGE]', data);
        setBinanceTickers((prev: any) => {
          return {
            ...prev,
            data,
          };
        });
      }
    };

    handleMessage();
  }, [lastMessage]);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  console.log('[CONNECTION STATUS]', connectionStatus);

  return { binanceTickers };
};
