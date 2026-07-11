import Card from "@/components/ui/Card";
import Skeleton from "@/components/ui/Skeleton";

export default function CardPageSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-8 w-40" />

      <Card className="max-w-md space-y-4">
        <Skeleton className="h-5 w-32" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-full" />
        <Skeleton className="h-9 w-32" />
      </Card>
    </div>
  );
}
