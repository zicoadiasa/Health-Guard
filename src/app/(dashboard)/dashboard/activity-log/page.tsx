import { createClient } from "@/lib/supabase/server";
import { deleteActivityLog } from "@/actions/activity-log/delete";
import ActivityLogForm from "@/components/activity-log/ActivityLogForm";
import Card from "@/components/ui/Card";
import PageHeading from "@/components/ui/PageHeading";
import EmptyState from "@/components/ui/EmptyState";

export default async function ActivityLogPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: entries } = user
    ? await supabase
        .from("activity_logs")
        .select("id, activity_type, duration_minutes, calories_burned, activity_date")
        .eq("user_id", user.id)
        .order("activity_date", { ascending: false })
    : { data: [] };

  return (
    <div className="space-y-6">
      <PageHeading>Activity Log</PageHeading>

      <ActivityLogForm />

      <Card className="overflow-x-auto" title="Riwayat">
        {!entries || entries.length === 0 ? (
          <EmptyState message="Belum ada catatan." />
        ) : (
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-4">Aktivitas</th>
                <th className="py-2 pr-4">Tanggal</th>
                <th className="py-2 pr-4">Durasi</th>
                <th className="py-2 pr-4">Kalori</th>
                <th className="py-2 pr-4" />
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-100">
                  <td className="py-2 pr-4 capitalize">{entry.activity_type}</td>
                  <td className="py-2 pr-4">{entry.activity_date}</td>
                  <td className="py-2 pr-4">
                    {entry.duration_minutes ?? "-"} menit
                  </td>
                  <td className="py-2 pr-4">{entry.calories_burned ?? "-"}</td>
                  <td className="py-2 pr-4">
                    <form action={deleteActivityLog.bind(null, entry.id)}>
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
