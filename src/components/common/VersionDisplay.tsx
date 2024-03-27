import { useAppVersionCheck } from '@/hooks/useAppVersionCheck.ts';
import { useBackendVersionCheck } from '@/hooks/useTradingCoreVersionCheck.ts';

export default function VersionDisplay() {
  const clientVersion = useAppVersionCheck();
  const backendVersion = useBackendVersionCheck();

  return (
    <p>
      <span>
        Client version: {clientVersion.isLoading ? 'Loading...' : clientVersion.data ? clientVersion.data : 'Unknown'}
      </span>
      <br />
      <span>
        Core version: {backendVersion.isLoading ? 'Loading...' : backendVersion.data ? backendVersion.data : 'Unknown'}
      </span>
    </p>
  );
}
