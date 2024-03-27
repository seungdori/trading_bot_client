import { useAssetsData } from '@/hooks/useAssetsData.tsx';
import AssetsTable from '@/components/assetsTable/AssetsTable.tsx';
import TableSkeleton from '@/components/assetsTable/TableSkeleton.tsx';
export default function AssetsTableWrapper() {
  const { isLoading, assets } = useAssetsData();

  if (isLoading) {
    return <TableSkeleton />;
  }

  return <AssetsTable assetsData={assets} />;
}
