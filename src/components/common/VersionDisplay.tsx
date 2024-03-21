import { useAppVersionCheck } from '@/hooks/useAppVersionCheck.ts';
import { useBackendVersionCheck } from '@/hooks/useTradingCoreVersionCheck.ts';

export default function VersionDisplay() {
  const clientVersion = useAppVersionCheck();
  const backendVersion = useBackendVersionCheck();

  return (
    <div className="flex flex-col space-y-1">
      <p>
        Client version: {clientVersion.isLoading ? 'Loading...' : clientVersion.data ? clientVersion.data : 'Unknown'}
      </p>
      <p>
        Core version: {backendVersion.isLoading ? 'Loading...' : backendVersion.data ? backendVersion.data : 'Unknown'}
      </p>
    </div>
  );
}
