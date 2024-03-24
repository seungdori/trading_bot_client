import { useEffect, useState } from 'react';
import { Exchange } from '@/types/exchangeTypes.ts';
import { DESKTOP_BACKEND_WS_URL } from '@/schemas/backendSchema.ts';
import { useTadingLogStore } from '@/store/transactionLogStore.ts';
import useWebSocket, { ReadyState } from 'react-use-websocket';

export const useTradingLog = ({
  exchange,
  delimiter,
  defaultMessage,
}: {
  exchange: Exchange;
  delimiter: string;
  defaultMessage: string;
}) => {
  const endpoint = new URL(`/trading/${exchange}/logs`, DESKTOP_BACKEND_WS_URL);
  const { lastMessage, readyState } = useWebSocket(endpoint.href);
  const { logs, append, clearStorage } = useTadingLogStore(exchange);
  const [log, setLog] = useState<string>(logs?.join(delimiter) ?? defaultMessage);

  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  const clear = () => {
    clearStorage();
    setLog('');
  };

  useEffect(() => {
    if (lastMessage !== null) {
      append(lastMessage.data);
      setLog((prev) => prev + delimiter + lastMessage.data);
    }
  }, [lastMessage]);

  return { status: connectionStatus, log, clear };
};
