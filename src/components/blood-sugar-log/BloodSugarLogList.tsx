import { deleteBloodSugarLog } from "@/actions/blood-sugar-log/delete";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import IconChip from "@/components/ui/IconChip";
import EmptyState from "@/components/ui/EmptyState";
import { getBloodSugarStatus } from "@/lib/health-metrics";

type BloodSugarEntry = {
  id: string;
  blood_sugar_level: number;
  measured_at: string;
  notes: string | null;
};

type BloodSugarLogListProps = {
  entries: BloodSugarEntry[];
};

export default function BloodSugarLogList({ entries }: BloodSugarLogListProps) {
  if (entries.length === 0) {
    return (
      <Card>
        <EmptyState message="Belum ada catatan gula darah." icon="droplet" />
      </Card>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map((entry) => {
        const status = getBloodSugarStatus(entry.blood_sugar_level);
        return (
          <Card key={entry.id} className="flex items-center gap-3 py-3">
            <IconChip name="droplet" bg="bg-red-50" color="text-red-600" size="h-10 w-10" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <p className="font-semibold text-gray-900">
                  {entry.blood_sugar_level} mg/dL
                </p>
                <Badge variant={status.variant}>{status.label}</Badge>
              </div>
              <p className="text-sm text-gray-500">
                {new Date(entry.measured_at).toLocaleString("id-ID", {
                  day: "numeric",
                  month: "long",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              {entry.notes && <p className="mt-0.5 text-sm text-gray-600">{entry.notes}</p>}
            </div>
            <form action={deleteBloodSugarLog.bind(null, entry.id)}>
              <button type="submit" className="text-sm text-red-600 hover:underline">
                Hapus
              </button>
            </form>
          </Card>
        );
      })}
    </div>
  );
}
