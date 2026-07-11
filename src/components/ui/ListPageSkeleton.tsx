import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export default function ListPageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-40" />

      <Card className="max-w-2xl space-y-4">
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-32" />
      </Card>

      <Card className="space-y-3">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </Card>
    </div>
  );
}
