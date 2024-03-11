import { tauriStore } from '@/lib/tauriStore.ts';

export const useSettingsStore = () => {
  const set = async (key: string, value: unknown): Promise<void> => {
    await tauriStore.set(key, value);
  };

  const get = async <T>(key: string): Promise<T | null> => {
    return await tauriStore.get<T>(key);
  };

  return { set, get };
};
