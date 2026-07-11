import { deleteReminder } from "@/actions/reminder/delete";
import { toggleReminderStatus } from "@/actions/reminder/toggle-status";
import Card from "@/components/ui/Card";
import IconChip from "@/components/ui/IconChip";
import Badge from "@/components/ui/Badge";
import EmptyState from "@/components/ui/EmptyState";
import { translateReminderType } from "@/lib/labels";

type ReminderEntry = {
  id: string;
  title: string;
  reminder_type: string;
  reminder_time: string;
  status: string;
};

type ReminderListProps = {
  entries: ReminderEntry[];
};

function formatTime(value: string) {
  return new Date(value).toLocaleString("id-ID", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function ReminderCard({ entry }: { entry: ReminderEntry }) {
  return (
    <Card className="flex items-center gap-3 py-3">
      <IconChip name="bell" bg="bg-purple-50" color="text-purple-600" size="h-10 w-10" />
      <div className="flex-1">
        <p className="font-medium text-gray-900">{entry.title}</p>
        <p className="text-sm text-gray-500">
          {translateReminderType(entry.reminder_type)} &middot; {formatTime(entry.reminder_time)}
        </p>
      </div>
      <form action={toggleReminderStatus.bind(null, entry.id, entry.status)}>
        <button type="submit">
          <Badge variant={entry.status === "active" ? "success" : "neutral"}>
            {entry.status === "active" ? "Aktif" : "Nonaktif"}
          </Badge>
        </button>
      </form>
      <form action={deleteReminder.bind(null, entry.id)}>
        <button type="submit" className="text-sm text-red-600 hover:underline">
          Hapus
        </button>
      </form>
    </Card>
  );
}

export default function ReminderList({ entries }: ReminderListProps) {
  if (entries.length === 0) {
    return (
      <Card>
        <EmptyState message="Belum ada reminder." icon="bell" />
      </Card>
    );
  }

  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const startOfTomorrow = new Date(startOfToday);
  startOfTomorrow.setDate(startOfToday.getDate() + 1);

  const overdue: ReminderEntry[] = [];
  const today: ReminderEntry[] = [];
  const upcoming: ReminderEntry[] = [];

  for (const entry of entries) {
    const time = new Date(entry.reminder_time);
    if (time < startOfToday) overdue.push(entry);
    else if (time < startOfTomorrow) today.push(entry);
    else upcoming.push(entry);
  }

  const sections: { heading: string; items: ReminderEntry[] }[] = [
    { heading: "Terlewat", items: overdue },
    { heading: "Hari Ini", items: today },
    { heading: "Akan Datang", items: upcoming },
  ].filter((section) => section.items.length > 0);

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section.heading}>
          <h3 className="mb-2 text-sm font-semibold text-gray-600">{section.heading}</h3>
          <div className="space-y-2">
            {section.items.map((entry) => (
              <ReminderCard key={entry.id} entry={entry} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
