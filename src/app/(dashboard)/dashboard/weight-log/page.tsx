import { createClient } from "@/lib/supabase/server";
import { deleteWeightLog } from "@/actions/weight-log/delete";
import WeightLogForm from "@/components/weight-log/WeightLogForm";
import Card from "@/components/ui/Card";
import PageHeading from "@/components/ui/PageHeading";
import EmptyState from "@/components/ui/EmptyState";

export default async function WeightLogPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: entries } = user
    ? await supabase
        .from("weight_logs")
        .select("id, weight_kg, recorded_at, notes")
        .eq("user_id", user.id)
        .order("recorded_at", { ascending: false })
    : { data: [] };

  return (
    <div className="space-y-6">
      <PageHeading>Weight Log</PageHeading>

      <WeightLogForm />

      <Card className="overflow-x-auto" title="Riwayat">
        {!entries || entries.length === 0 ? (
          <EmptyState message="Belum ada catatan." />
        ) : (
          <table className="w-full min-w-[480px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-4">Berat (kg)</th>
                <th className="py-2 pr-4">Waktu</th>
                <th className="py-2 pr-4">Catatan</th>
                <th className="py-2 pr-4" />
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-100">
                  <td className="py-2 pr-4">{entry.weight_kg}</td>
                  <td className="py-2 pr-4">
                    {new Date(entry.recorded_at).toLocaleString("id-ID")}
                  </td>
                  <td className="py-2 pr-4">{entry.notes || "-"}</td>
                  <td className="py-2 pr-4">
                    <form action={deleteWeightLog.bind(null, entry.id)}>
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
