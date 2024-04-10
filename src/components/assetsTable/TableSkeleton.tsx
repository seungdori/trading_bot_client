import { Skeleton } from '@/components/ui/skeleton';

export default function TableSkeleton() {
  return (
    <div className="flex flex-col space-y-4 p-4 bg-white shadow rounded-lg">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center p-2">
        <Skeleton className="h-6 w-1/4 rounded" />
        <Skeleton className="h-6 w-1/5 rounded" />
      </div>
      {/* Table Row Skeletons */}
      <div className="space-y-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div key={index} className="grid grid-cols-8 gap-4">
            <Skeleton className="col-span-2 h-4 rounded" />
            <Skeleton className="col-span-3 h-4 rounded" />
            <Skeleton className="col-span-2 h-4 rounded" />
            <Skeleton className="col-span-1 h-4 rounded" />
            <Skeleton className="col-span-1 h-5 rounded" />
          </div>
        ))}
      </div>
      {/* Pagination Skeleton */}
      <div className="flex justify-end space-x-2 pt-2">
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
        <Skeleton className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );
}
