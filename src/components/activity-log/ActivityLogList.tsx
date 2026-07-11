import { deleteActivityLog } from "@/actions/activity-log/delete";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import EmptyState from "@/components/ui/EmptyState";
import { translateActivityType } from "@/lib/labels";

type ActivityLogEntry = {
  id: string;
  activity_type: string;
  duration_minutes: number | null;
  calories_burned: number | null;
  activity_date: string;
};

type ActivityLogListProps = {
  entries: ActivityLogEntry[];
};

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDateHeading(dateKey: string) {
  const date = new Date(dateKey);
  const today = new Date();
  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);

  if (isSameDay(date, today)) return "Hari Ini";
  if (isSameDay(date, yesterday)) return "Kemarin";
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function ActivityLogList({ entries }: ActivityLogListProps) {
  if (entries.length === 0) {
    return (
      <Card>
        <EmptyState message="Belum ada catatan aktivitas." icon="activity" />
      </Card>
    );
  }

  const groups = new Map<string, ActivityLogEntry[]>();
  for (const entry of entries) {
    const list = groups.get(entry.activity_date) ?? [];
    list.push(entry);
    groups.set(entry.activity_date, list);
  }
  const grouped = Array.from(groups.entries()).sort((a, b) => (a[0] < b[0] ? 1 : -1));

  return (
    <div className="space-y-4">
      {grouped.map(([dateKey, dayEntries]) => (
        <div key={dateKey}>
          <h3 className="mb-2 text-sm font-semibold text-gray-600">
            {formatDateHeading(dateKey)}
          </h3>
          <div className="space-y-2">
            {dayEntries.map((entry) => (
              <Card key={entry.id} className="flex items-center gap-3 py-3">
                <IconChip
                  name="activity"
                  bg="bg-green-50"
                  color="text-green-600"
                  size="h-10 w-10"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">
                    {translateActivityType(entry.activity_type)}
                  </p>
                  <p className="text-sm text-gray-500">
                    {entry.duration_minutes ?? "-"} menit
                  </p>
                </div>
                <p className="font-semibold text-gray-900">
                  {entry.calories_burned ?? "-"} kkal
                </p>
                <form action={deleteActivityLog.bind(null, entry.id)}>
                  <button type="submit" className="text-sm text-red-600 hover:underline">
                    Hapus
                  </button>
                </form>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
