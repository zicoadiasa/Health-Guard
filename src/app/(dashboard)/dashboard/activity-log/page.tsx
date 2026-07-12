import { createClient } from "@/lib/supabase/server";
import ActivityLogForm from "@/components/activity-log/ActivityLogForm";
import ActivityLogList from "@/components/activity-log/ActivityLogList";
import Card from "@/components/ui/Card";
import PageHeading from "@/components/ui/PageHeading";
import IconChip from "@/components/ui/IconChip";
import ProgressBar from "@/components/ui/ProgressBar";
import { todayRange, weekAgoDateStr } from "@/lib/date";

const DEFAULT_DAILY_TARGET_MINUTES = 30;

export default async function ActivityLogPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { dateStr } = todayRange();
  const weekAgoStr = weekAgoDateStr();

  const [{ data: entries }, { data: activityGoal }] = await Promise.all([
    supabase
      .from("activity_logs")
      .select("id, activity_type, duration_minutes, calories_burned, activity_date")
      .eq("user_id", user.id)
      .order("activity_date", { ascending: false }),
    supabase
      .from("goals")
      .select("target_value")
      .eq("user_id", user.id)
      .eq("goal_type", "increase_activity")
      .eq("status", "active")
      .limit(1)
      .maybeSingle(),
  ]);

  const allEntries = entries ?? [];
  const todayEntries = allEntries.filter((entry) => entry.activity_date === dateStr);
  const weekEntries = allEntries.filter((entry) => entry.activity_date >= weekAgoStr);

  const totalDurationToday = todayEntries.reduce(
    (sum, entry) => sum + (entry.duration_minutes ?? 0),
    0
  );
  const totalCaloriesToday = todayEntries.reduce(
    (sum, entry) => sum + (entry.calories_burned ?? 0),
    0
  );

  const dailyTarget = activityGoal?.target_value ?? DEFAULT_DAILY_TARGET_MINUTES;
  const progress = Math.round((totalDurationToday / dailyTarget) * 100);
  const isTargetReached = totalDurationToday >= dailyTarget;

  const insightSentence = isTargetReached
    ? "Kerja bagus! Target aktivitas harianmu sudah tercapai."
    : totalDurationToday === 0
      ? `Belum ada aktivitas tercatat hari ini. Yuk mulai gerak, targetnya ${dailyTarget} menit.`
      : `Sedikit lagi! ${Math.max(dailyTarget - totalDurationToday, 0)} menit lagi menuju target harianmu.`;

  const weeklyTotalDuration = weekEntries.reduce(
    (sum, entry) => sum + (entry.duration_minutes ?? 0),
    0
  );
  const weeklyTotalCalories = weekEntries.reduce(
    (sum, entry) => sum + (entry.calories_burned ?? 0),
    0
  );

  return (
    <div className="space-y-6">
      <PageHeading>Aktivitas</PageHeading>

      <Card>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <IconChip name="activity" bg="bg-green-50" color="text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Aktivitas Hari Ini</p>
              <p className="text-3xl font-semibold text-gray-900">
                {totalDurationToday} menit
              </p>
            </div>
          </div>
          <div className="w-full sm:w-56">
            <ProgressBar value={progress} colorClassName="bg-green-500" />
            <p className="mt-1 text-right text-xs text-gray-500">
              dari target {dailyTarget} menit
            </p>
          </div>
        </div>
        <p className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-700">
          {insightSentence}
        </p>
      </Card>

      <Card>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Ringkasan</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div>
            <p className="text-sm text-gray-600">Kalori Terbakar Hari Ini</p>
            <p className="text-xl font-semibold text-gray-900">{totalCaloriesToday} kkal</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Sesi Hari Ini</p>
            <p className="text-xl font-semibold text-gray-900">{todayEntries.length}x</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Total Minggu Ini</p>
            <p className="text-xl font-semibold text-gray-900">{weeklyTotalDuration} menit</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Kalori Minggu Ini</p>
            <p className="text-xl font-semibold text-gray-900">{weeklyTotalCalories} kkal</p>
          </div>
        </div>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Riwayat</h2>
        <ActivityLogList entries={allEntries} />
      </div>

      <ActivityLogForm />
    </div>
  );
}
