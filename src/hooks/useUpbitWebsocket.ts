import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useEffect, useState } from 'react';
import { UPBIT_WS_URL } from '@/components/api/upbitClient.ts';
import * as uuid from 'uuid';
import { z } from 'zod';
import { UpbitSocketRequestPayloadSchema, UpbitSocketTickerSchema } from '@/schemas/upbitSchema.ts';

// 업비트 코인 목록. e.g. KRW-BTC, KRW-ETH, KRW-XRP
type MarketSymbols = string[];

/**
 * Example
 * {
 *  'KRW-BTC': {
 *    ...values
 *   }
 * }
 */
export type TickerWithKey = Record<string, z.infer<typeof UpbitSocketTickerSchema>>;

export const useUpbitWebSocket = ({ accessToken, symbols }: { accessToken: string; symbols: MarketSymbols }) => {
  const [upbitTickers, setUpbitTickers] = useState<TickerWithKey>({});
  const { sendMessage, lastMessage, readyState } = useWebSocket(
    UPBIT_WS_URL,
    {
      protocols: [accessToken],
      onError: (e) => console.error('[WS ERROR]', e),
      retryOnError: false,
      reconnectAttempts: 5,
      shouldReconnect: () => true,
    },
    !!accessToken, // Only connect when accessToken is available
  );

  useEffect(() => {
    if (!accessToken) {
      return;
    }

    const requestPayload: z.infer<typeof UpbitSocketRequestPayloadSchema> = {
      type: 'ticker',
      codes: symbols, // e.g. ['KRW-BTC', 'BTC-BCH'],
    };
    sendMessage(
      JSON.stringify([
        { ticket: uuid.v4() },
        { ...requestPayload },
        {
          format: 'DEFAULT',
        },
      ]),
    );
  }, [accessToken]);

  useEffect(() => {
    const handleMessage = async () => {
      if (lastMessage !== null) {
        const blob: Blob = lastMessage.data;
        const text = await blob.text();
        const data: z.infer<typeof UpbitSocketTickerSchema> = JSON.parse(text);
        setUpbitTickers((prev) => {
          return {
            ...prev,
            [data.code]: data,
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

  return { upbitTickers };
};
