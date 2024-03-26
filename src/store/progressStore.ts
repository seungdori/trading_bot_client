import { ExchangeStateStore } from '@/store/strategyStore.ts';
import { useLocalStorage } from '@/store/settingsStore.ts';

type Status = 'started' | 'progressing' | 'completed' | 'stopped';

/**
 * @description - Clear AI search progress. Called when the app started.
 */
export function clearAiSearchStatus() {
  const { storage } = useLocalStorage();
  const keys = Object.keys(storage).filter((key) => key.startsWith('ai-search-status'));
  keys.forEach((key) => storage.removeItem(key));
}

/**
 * @description - Get or Set the AI search progress status.
 * @example - http://localhost:1420/?progress-upbit-long-전략1
 */
export const useAiSearchStatusStore = (
  { exchange, store: { enterStrategy, customStrategy } }: Pick<ExchangeStateStore, 'exchange' | 'store'>,
  componentId?: string,
) => {
  const key = componentId
    ? `ai-search-status-${exchange}-${enterStrategy}-${customStrategy}-${componentId}`
    : `ai-search-status-${exchange}-${enterStrategy}-${customStrategy}`;
  const { get, set } = useLocalStorage();

  const status = get(key) as Status | null;

  const setStatus = (value: Status) => set(key, value);

  return { key, status, setStatus };
};
