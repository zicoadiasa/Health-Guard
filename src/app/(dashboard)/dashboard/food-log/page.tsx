import { createClient } from "@/lib/supabase/server";
import FoodLogForm from "@/components/food-log/FoodLogForm";
import FoodLogList from "@/components/food-log/FoodLogList";
import Card from "@/components/ui/Card";
import PageHeading from "@/components/ui/PageHeading";
import IconChip from "@/components/ui/IconChip";
import ProgressBar from "@/components/ui/ProgressBar";
import { todayRange, weekAgoISO } from "@/lib/date";

export default async function FoodLogPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { startISO, endISO } = todayRange();
  const weekAgo = weekAgoISO();

  const [{ data: entries }, { data: healthProfile }] = await Promise.all([
    supabase
      .from("food_logs")
      .select("id, food_name, meal_type, calories, consumed_at")
      .eq("user_id", user.id)
      .order("consumed_at", { ascending: false }),
    supabase
      .from("health_profiles")
      .select("daily_calorie_target")
      .eq("user_id", user.id)
      .single(),
  ]);

  const allEntries = entries ?? [];
  const todayEntries = allEntries.filter(
    (entry) => entry.consumed_at >= startISO && entry.consumed_at < endISO
  );
  const totalCaloriesToday = todayEntries.reduce(
    (sum, entry) => sum + (entry.calories ?? 0),
    0
  );

  const calorieTarget = healthProfile?.daily_calorie_target ?? null;
  const calorieProgress = calorieTarget
    ? Math.round((totalCaloriesToday / calorieTarget) * 100)
    : 0;

  const weekEntries = allEntries.filter((entry) => entry.consumed_at >= weekAgo);
  const weeklyTotalCalories = weekEntries.reduce(
    (sum, entry) => sum + (entry.calories ?? 0),
    0
  );
  const weeklyAvgCalories =
    weekEntries.length > 0 ? Math.round(weeklyTotalCalories / 7) : 0;

  return (
    <div className="space-y-6">
      <PageHeading>Catatan Makan</PageHeading>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <IconChip name="flame" bg="bg-orange-50" color="text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Kalori Hari Ini</p>
              <p className="text-3xl font-semibold text-gray-900">
                {totalCaloriesToday} kkal
              </p>
            </div>
          </div>
          {calorieTarget && (
            <div className="w-full sm:w-56">
              <ProgressBar value={calorieProgress} colorClassName="bg-orange-500" />
              <p className="mt-1 text-right text-xs text-gray-500">
                dari target {calorieTarget} kkal
              </p>
            </div>
          )}
        </div>
      </Card>

      <FoodLogForm />

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Riwayat</h2>
        <FoodLogList entries={allEntries} />
      </div>

      {weekEntries.length > 0 && (
        <Card>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">
            Statistik Minggu Ini
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Rata-rata Kalori/Hari</p>
              <p className="text-xl font-semibold text-gray-900">
                {weeklyAvgCalories} kkal
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Catatan</p>
              <p className="text-xl font-semibold text-gray-900">
                {weekEntries.length}x
              </p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}
