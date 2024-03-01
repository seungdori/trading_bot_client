import { useAssetsData } from '@/hooks/useAssetsData.ts';
import AssetsTable from '@/components/table/AssetsTable.tsx';
import TableSkeleton from '@/components/table/TableSkeleton.tsx';
export default function AssetsTableWrapper() {
  const { data, isPending } = useAssetsData();

  if (isPending || !data) {
    return <TableSkeleton />;
  }

  return <AssetsTable assetsData={data} />;
}
