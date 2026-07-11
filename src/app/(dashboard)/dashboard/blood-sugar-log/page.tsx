import { createClient } from "@/lib/supabase/server";
import BloodSugarLogForm from "@/components/blood-sugar-log/BloodSugarLogForm";
import BloodSugarLogList from "@/components/blood-sugar-log/BloodSugarLogList";
import Card from "@/components/ui/Card";
import PageHeading from "@/components/ui/PageHeading";
import Badge from "@/components/ui/Badge";
import IconChip from "@/components/ui/IconChip";
import TrendChart from "@/components/ui/TrendChart";
import { getBloodSugarStatus } from "@/lib/health-metrics";

export default async function BloodSugarLogPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: entries } = await supabase
    .from("blood_sugar_logs")
    .select("id, blood_sugar_level, measured_at, notes")
    .eq("user_id", user.id)
    .order("measured_at", { ascending: false });

  const allEntries = entries ?? [];
  const latest = allEntries[0] ?? null;
  const latestStatus = getBloodSugarStatus(latest?.blood_sugar_level ?? null);

  const last14 = [...allEntries].slice(0, 14).reverse();
  const chartData = last14.map((entry) => ({
    label: new Date(entry.measured_at).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    }),
    value: entry.blood_sugar_level,
  }));

  const weekAgoISO = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();
  const weekEntries = allEntries.filter((entry) => entry.measured_at >= weekAgoISO);
  const weekLevels = weekEntries.map((entry) => entry.blood_sugar_level);
  const weekAvg =
    weekLevels.length > 0
      ? Math.round(weekLevels.reduce((sum, v) => sum + v, 0) / weekLevels.length)
      : null;
  const weekMin = weekLevels.length > 0 ? Math.min(...weekLevels) : null;
  const weekMax = weekLevels.length > 0 ? Math.max(...weekLevels) : null;

  return (
    <div className="space-y-6">
      <PageHeading>Gula Darah</PageHeading>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <IconChip name="droplet" bg="bg-red-50" color="text-red-600" />
            <div>
              <p className="text-sm text-gray-600">Kadar Terakhir</p>
              <p className="text-3xl font-semibold text-gray-900">
                {latest ? `${latest.blood_sugar_level} mg/dL` : "-"}
              </p>
            </div>
          </div>
          {latest && <Badge variant={latestStatus.variant}>{latestStatus.label}</Badge>}
        </div>

        <div className="mt-6 border-t border-gray-100 pt-4">
          <p className="mb-2 text-sm font-medium text-gray-700">Tren (14 catatan terakhir)</p>
          <TrendChart data={chartData} color="#dc2626" />
        </div>
      </Card>

      <Card>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Ringkasan Minggu Ini</h2>
        <div className="grid grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-600">Rata-rata</p>
            <p className="text-xl font-semibold text-gray-900">{weekAvg ?? "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Terendah</p>
            <p className="text-xl font-semibold text-gray-900">{weekMin ?? "-"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Tertinggi</p>
            <p className="text-xl font-semibold text-gray-900">{weekMax ?? "-"}</p>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Riwayat</h2>
        <BloodSugarLogList entries={allEntries} />
      </div>

      <BloodSugarLogForm />
    </div>
  );
}
