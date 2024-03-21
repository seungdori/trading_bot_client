import { useNavigate } from 'react-router-dom';
import { useHealthCheckBackend } from '@/hooks/useHealthCheckBackend.ts';
import { Icons } from '@/components/common/Icons.tsx';

export default function HealthCheckPage() {
  const navigate = useNavigate();
  const { data: isBackendReady } = useHealthCheckBackend();

  if (isBackendReady) {
    navigate(`/auth`, { replace: true });
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
      <p className="mt-4 text-lg font-bold">자동매매 프로그램을 실행중입니다...</p>
    </div>
  );
}