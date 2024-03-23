import { useFetchPositions } from '@/hooks/useAssetsData.ts';
import { useEffect } from 'react';

const CACHE_INTERVAL = 1000 * 60 * 5;

/**
 * @description fetches positions from exchanges and caches them.
 */
function cachePositions() {
  useFetchPositions('binance', CACHE_INTERVAL);
  useFetchPositions('upbit', CACHE_INTERVAL);
  useFetchPositions('bithumb', CACHE_INTERVAL);
}

export const useCachePosition = () => {
  useEffect(() => {
    cachePositions();
  }, []);
};
