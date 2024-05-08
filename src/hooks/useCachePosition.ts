import { useFetchPositions } from '@/hooks/useAssetsData.tsx';

const CACHE_INTERVAL = 1000 * 60 * 5;

/**
 * @description fetches positions from exchanges and caches them.
 */
export function cachePositions() {
  useFetchPositions('binance', CACHE_INTERVAL);
  useFetchPositions('upbit', CACHE_INTERVAL);
  useFetchPositions('bithumb', CACHE_INTERVAL);
  useFetchPositions('bitget', CACHE_INTERVAL);
  useFetchPositions('okx', CACHE_INTERVAL);
  useFetchPositions('okx_spot', CACHE_INTERVAL);
  useFetchPositions('binance_spot', CACHE_INTERVAL);
  useFetchPositions('bitget_spot', CACHE_INTERVAL);
}
