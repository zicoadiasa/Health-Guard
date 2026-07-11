import { createClient } from "@/lib/supabase/server";
import WeightLogForm from "@/components/weight-log/WeightLogForm";
import WeightLogList from "@/components/weight-log/WeightLogList";
import Card from "@/components/ui/Card";
import PageHeading from "@/components/ui/PageHeading";
import Badge from "@/components/ui/Badge";
import IconChip from "@/components/ui/IconChip";
import TrendChart from "@/components/ui/TrendChart";
import CircularProgress from "@/components/ui/CircularProgress";
import { calculateBMI, getBMICategory } from "@/lib/health-metrics";

export default async function WeightLogPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const [{ data: entries }, { data: healthProfile }, { data: weightGoal }] =
    await Promise.all([
      supabase
        .from("weight_logs")
        .select("id, weight_kg, recorded_at, notes")
        .eq("user_id", user.id)
        .order("recorded_at", { ascending: false }),
      supabase
        .from("health_profiles")
        .select("height_cm")
        .eq("user_id", user.id)
        .single(),
      supabase
        .from("goals")
        .select("goal_type, target_value, current_value, unit")
        .eq("user_id", user.id)
        .in("goal_type", ["lose_weight", "gain_weight", "maintain_weight"])
        .eq("status", "active")
        .limit(1)
        .maybeSingle(),
    ]);

  const allEntries = entries ?? [];
  const latest = allEntries[0] ?? null;
  const bmi = calculateBMI(latest?.weight_kg ?? null, healthProfile?.height_cm ?? null);
  const bmiCategory = getBMICategory(bmi);

  const last14 = [...allEntries].slice(0, 14).reverse();
  const chartData = last14.map((entry) => ({
    label: new Date(entry.recorded_at).toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
    }),
    value: entry.weight_kg,
  }));

  let goalProgressPct: number | null = null;
  if (weightGoal?.target_value && latest) {
    const start = weightGoal.current_value ?? latest.weight_kg;
    const total = Math.abs(weightGoal.target_value - start) || 1;
    const done = Math.abs(latest.weight_kg - start);
    goalProgressPct = Math.min(100, Math.round((done / total) * 100));
  }

  return (
    <div className="space-y-6">
      <PageHeading>Berat Badan</PageHeading>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <IconChip name="scale" bg="bg-blue-50" color="text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Berat Terakhir</p>
              <p className="text-3xl font-semibold text-gray-900">
                {latest ? `${latest.weight_kg} kg` : "-"}
              </p>
            </div>
          </div>
          {bmi !== null && (
            <div className="text-right">
              <p className="text-sm text-gray-600">BMI</p>
              <div className="flex items-center gap-2">
                <span className="text-lg font-semibold text-gray-900">{bmi}</span>
                <Badge variant={bmiCategory.variant}>{bmiCategory.label}</Badge>
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 border-t border-gray-100 pt-4">
          <p className="mb-2 text-sm font-medium text-gray-700">Tren (14 catatan terakhir)</p>
          <TrendChart data={chartData} color="#2563eb" />
        </div>
      </Card>

      {weightGoal && goalProgressPct !== null && (
        <Card className="flex items-center gap-4">
          <CircularProgress value={goalProgressPct} size={64} strokeWidth={6} />
          <div>
            <p className="font-medium text-gray-900">Progress Menuju Target</p>
            <p className="text-sm text-gray-600">
              Target: {weightGoal.target_value} {weightGoal.unit || "kg"}
            </p>
          </div>
        </Card>
      )}

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Riwayat</h2>
        <WeightLogList entries={allEntries} />
      </div>

      <WeightLogForm />
    </div>
  );
}
