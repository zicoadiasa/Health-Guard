import { createClient } from "@/lib/supabase/server";
import { deleteReminder } from "@/actions/reminder/delete";
import { toggleReminderStatus } from "@/actions/reminder/toggle-status";
import ReminderForm from "@/components/reminder/ReminderForm";
import Card from "@/components/ui/Card";
import PageHeading from "@/components/ui/PageHeading";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";

export default async function ReminderPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: entries } = user
    ? await supabase
        .from("reminders")
        .select("id, title, reminder_type, reminder_time, status")
        .eq("user_id", user.id)
        .order("reminder_time", { ascending: true })
    : { data: [] };

  return (
    <div className="space-y-6">
      <PageHeading>Reminder</PageHeading>

      <ReminderForm />

      <Card className="overflow-x-auto" title="Daftar Reminder">
        {!entries || entries.length === 0 ? (
          <EmptyState message="Belum ada reminder." />
        ) : (
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-4">Judul</th>
                <th className="py-2 pr-4">Jenis</th>
                <th className="py-2 pr-4">Waktu</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4" />
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-100">
                  <td className="py-2 pr-4">{entry.title}</td>
                  <td className="py-2 pr-4 capitalize">
                    {entry.reminder_type.replaceAll("_", " ")}
                  </td>
                  <td className="py-2 pr-4">
                    {new Date(entry.reminder_time).toLocaleString("id-ID")}
                  </td>
                  <td className="py-2 pr-4">
                    <form
                      action={toggleReminderStatus.bind(
                        null,
                        entry.id,
                        entry.status
                      )}
                    >
                      <button type="submit">
                        <Badge
                          variant={
                            entry.status === "active" ? "success" : "neutral"
                          }
                        >
                          {entry.status}
                        </Badge>
                      </button>
                    </form>
                  </td>
                  <td className="py-2 pr-4">
                    <form action={deleteReminder.bind(null, entry.id)}>
                      <button
                        type="submit"
                        className="text-red-600 hover:underline"
                      >
                        Hapus
                      </button>
                    </form>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Card>
    </div>
  );
}
