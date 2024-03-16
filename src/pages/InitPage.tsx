import { Icons } from '@/components/common/Icons.tsx';
import { useHealthCheckBackend } from '@/hooks/useHealthCheckBackend.ts';
import { useNavigate } from 'react-router-dom';

export default function InitPage() {
  const navigate = useNavigate();
  const { data: isBackendReady } = useHealthCheckBackend();

  if (isBackendReady) {
    navigate(`/auth`, { replace: true });
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      <p className="mt-4 text-lg font-bold">Loading...</p>
    </div>
  );
}
