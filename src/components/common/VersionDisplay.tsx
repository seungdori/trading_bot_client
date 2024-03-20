import { useAppVersionCheck } from '@/hooks/useAppVersionCheck.ts';

export default function VersionDisplay() {
  const { isLoading, data } = useAppVersionCheck();
  return isLoading ? <p>Loading...</p> : data ? <p>App version {data}</p> : <p>Unknown</p>;
}
