import { useAssetsData } from '@/hooks/useAssetsData.ts';
import AssetsTable from '@/components/table/AssetsTable.tsx';
import TableSkeleton from '@/components/table/TableSkeleton.tsx';
export default function AssetsTableWrapper() {
  const { isLoading, assets } = useAssetsData();

  if (isLoading) {
    return <TableSkeleton />;
  }

  return <AssetsTable assetsData={assets} />;
}
