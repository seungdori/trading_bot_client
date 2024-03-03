import { useUpbitWebSocket } from '@/hooks/useUpbitWebsocket.ts';
import { useUpbitAccessToken } from '@/hooks/useUpbitAccessToken.ts';
import { useWallet } from '@/hooks/useWallet.ts';
import { z } from 'zod';
import { UpbitWalletSchema } from '@/schemas/upbitSchema.ts';

// e.g. ['KRW-BTC', 'KRW-ETH', 'KRW-DOGE'];
export function buildUpbitSymbols(wallet?: z.infer<typeof UpbitWalletSchema>) {
  console.log(`[Build Upbit Symbols]`, wallet);
  if (!wallet) {
    return [];
  }

  return wallet.withOutKrw.map((market) => `${market.unit_currency}-${market.currency}`);
}

export const useUpbitAssets = () => {
  const walletQuery = useWallet();
  const accessTokenQuery = useUpbitAccessToken();
  const symbols = buildUpbitSymbols(walletQuery?.data as z.infer<typeof UpbitWalletSchema>);
  const { upbitTickers } = useUpbitWebSocket({
    symbols,
    accessToken: accessTokenQuery.data ?? '',
  });

  if (!accessTokenQuery.data || !walletQuery.data) {
    return [];
  }

  return (
    <div>
      <h1>WebSocket Demo</h1>
      <p>{JSON.stringify(upbitTickers)}</p>
    </div>
  );
};

// import { useState, useCallback, useEffect } from 'react';
// import useWebSocket, { ReadyState } from 'react-use-websocket';
//
// export const WebSocketDemo = () => {
//   //Public API that will echo messages sent to it back to the client
//   const [socketUrl, setSocketUrl] = useState('wss://socketsbay.com/wss/v2/1/demo/');
//   const [messageHistory, setMessageHistory] = useState<MessageEvent<any>[]>([]);
//
//   const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);
//
//   useEffect(() => {
//     if (lastMessage !== null) {
//       setMessageHistory((prev) => prev.concat(lastMessage));
//     }
//   }, [lastMessage]);
//
//   const handleClickChangeSocketUrl = useCallback(() => setSocketUrl('wss://socketsbay.com/wss/v2/1/demo/'), []);
//
//   const handleClickSendMessage = useCallback(() => sendMessage('Hello'), []);
//
//   const connectionStatus = {
//     [ReadyState.CONNECTING]: 'Connecting',
//     [ReadyState.OPEN]: 'Open',
//     [ReadyState.CLOSING]: 'Closing',
//     [ReadyState.CLOSED]: 'Closed',
//     [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
//   }[readyState];
//
//   return (
//     <div>
//       <button onClick={handleClickChangeSocketUrl}>Click Me to change Socket Url</button>
//       <button onClick={handleClickSendMessage} disabled={readyState !== ReadyState.OPEN}>
//         Click Me to send 'Hello'
//       </button>
//       <span>The WebSocket is currently {connectionStatus}</span>
//       {lastMessage ? <span>Last message: {lastMessage.data}</span> : null}
//       <ul>
//         {messageHistory.map((message, idx) => (
//           <span key={idx}>{message ? message.data : null}</span>
//         ))}
//       </ul>
//     </div>
//   );
// };
