import { deleteWeightLog } from "@/actions/weight-log/delete";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import EmptyState from "@/components/ui/EmptyState";

type WeightEntry = {
  id: string;
  weight_kg: number;
  recorded_at: string;
  notes: string | null;
};

type WeightLogListProps = {
  entries: WeightEntry[];
};

export default function WeightLogList({ entries }: WeightLogListProps) {
  if (entries.length === 0) {
    return (
      <Card>
        <EmptyState message="Belum ada catatan berat badan." icon="scale" />
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => (
        <Card key={entry.id} className="flex items-center gap-3 py-3">
          <IconChip name="scale" bg="bg-blue-50" color="text-blue-600" size="h-10 w-10" />
          <div className="flex-1">
            <p className="font-semibold text-gray-900">{entry.weight_kg} kg</p>
            <p className="text-sm text-gray-500">
              {new Date(entry.recorded_at).toLocaleString("id-ID", {
                day: "numeric",
                month: "long",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            {entry.notes && <p className="mt-0.5 text-sm text-gray-600">{entry.notes}</p>}
          </div>
          <form action={deleteWeightLog.bind(null, entry.id)}>
            <button type="submit" className="text-sm text-red-600 hover:underline">
              Hapus
            </button>
          </form>
        </Card>
      ))}
    </div>
  );
}
