import Link from "next/link";
import { logout } from "@/actions/auth/logout";
import { createClient } from "@/lib/supabase/server";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import IconChip from "@/components/ui/IconChip";
import CircularProgress from "@/components/ui/CircularProgress";
import ProgressBar from "@/components/ui/ProgressBar";
import EmptyState from "@/components/ui/EmptyState";
import { calculateBMI, getBMICategory, getBloodSugarStatus } from "@/lib/health-metrics";
import { formatDisplayName } from "@/lib/format";
import { todayRange } from "@/lib/date";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 19) return "Selamat sore";
  return "Selamat malam";
}

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { startISO, endISO, dateStr } = todayRange();
  const weekAgoISO = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [
    { data: profile },
    { data: healthProfile },
    { data: todayFoodLogs },
    { data: todayActivityLogs },
    { data: todayBloodSugar },
    { data: latestWeightRows },
    { data: activeGoals },
    { data: todayReminders },
    { data: weekFoodLogs },
  ] = await Promise.all([
    supabase.from("users").select("full_name").eq("id", user.id).single(),
    supabase
      .from("health_profiles")
      .select("height_cm, weight_kg, daily_calorie_target, activity_level, diabetes_type")
      .eq("user_id", user.id)
      .single(),
    supabase
      .from("food_logs")
      .select("calories")
      .eq("user_id", user.id)
      .gte("consumed_at", startISO)
      .lt("consumed_at", endISO),
    supabase
      .from("activity_logs")
      .select("duration_minutes, calories_burned")
      .eq("user_id", user.id)
      .eq("activity_date", dateStr),
    supabase
      .from("blood_sugar_logs")
      .select("blood_sugar_level, measured_at")
      .eq("user_id", user.id)
      .gte("measured_at", startISO)
      .lt("measured_at", endISO)
      .order("measured_at", { ascending: false })
      .limit(1),
    supabase
      .from("weight_logs")
      .select("weight_kg, recorded_at")
      .eq("user_id", user.id)
      .order("recorded_at", { ascending: false })
      .limit(1),
    supabase
      .from("goals")
      .select("id, goal_type, target_value, current_value, unit")
      .eq("user_id", user.id)
      .eq("status", "active"),
    supabase
      .from("reminders")
      .select("id, title, reminder_time, status")
      .eq("user_id", user.id)
      .gte("reminder_time", startISO)
      .lt("reminder_time", endISO)
      .order("reminder_time", { ascending: true }),
    supabase
      .from("food_logs")
      .select("calories")
      .eq("user_id", user.id)
      .gte("consumed_at", weekAgoISO),
  ]);

  const totalCaloriesToday = (todayFoodLogs ?? []).reduce(
    (sum, e) => sum + (e.calories ?? 0),
    0
  );
  const totalDurationToday = (todayActivityLogs ?? []).reduce(
    (sum, e) => sum + (e.duration_minutes ?? 0),
    0
  );
  const totalCaloriesBurnedToday = (todayActivityLogs ?? []).reduce(
    (sum, e) => sum + (e.calories_burned ?? 0),
    0
  );

  const bmi = calculateBMI(healthProfile?.weight_kg ?? null, healthProfile?.height_cm ?? null);
  const bmiCategory = getBMICategory(bmi);

  const latestBloodSugar = todayBloodSugar?.[0] ?? null;
  const bloodSugarStatus = getBloodSugarStatus(latestBloodSugar?.blood_sugar_level ?? null);

  const latestWeight = latestWeightRows?.[0] ?? null;

  const calorieTarget = healthProfile?.daily_calorie_target ?? null;
  const calorieProgress = calorieTarget
    ? Math.round((totalCaloriesToday / calorieTarget) * 100)
    : 0;

  const weeklyTotalCalories = (weekFoodLogs ?? []).reduce(
    (sum, e) => sum + (e.calories ?? 0),
    0
  );
  const weeklyLogCount = (weekFoodLogs ?? []).length;

  const displayName = profile?.full_name ? formatDisplayName(profile.full_name) : "Pengguna";

  const quickActions = [
    { href: "/dashboard/food-log", label: "Makan", icon: "flame" as const, bg: "bg-orange-50", color: "text-orange-600" },
    { href: "/dashboard/activity-log", label: "Aktivitas", icon: "activity" as const, bg: "bg-green-50", color: "text-green-600" },
    { href: "/dashboard/blood-sugar-log", label: "Gula Darah", icon: "droplet" as const, bg: "bg-red-50", color: "text-red-600" },
    { href: "/dashboard/weight-log", label: "Berat", icon: "scale" as const, bg: "bg-blue-50", color: "text-blue-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm text-gray-600">{getGreeting()},</p>
        <h1 className="text-2xl font-semibold text-gray-900">{displayName}</h1>
      </div>

      {/* Blood Sugar — hero, paling penting bagi penderita diabetes */}
      <Card className="border-2 border-red-100 bg-red-50/40">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <IconChip name="droplet" bg="bg-red-100" color="text-red-600" />
            <div>
              <p className="text-sm font-medium text-gray-600">Gula Darah Hari Ini</p>
              {latestBloodSugar ? (
                <p className="text-4xl font-bold text-gray-900">
                  {latestBloodSugar.blood_sugar_level}
                  <span className="ml-1 text-base font-medium text-gray-500">mg/dL</span>
                </p>
              ) : (
                <p className="text-lg font-medium text-gray-500">Belum ada catatan</p>
              )}
            </div>
          </div>
          {latestBloodSugar ? (
            <Badge variant={bloodSugarStatus.variant} className="px-3 py-1 text-sm">
              {bloodSugarStatus.label}
            </Badge>
          ) : (
            <Link href="/dashboard/blood-sugar-log">
              <Button className="whitespace-nowrap">Catat Sekarang</Button>
            </Link>
          )}
        </div>
      </Card>

      {/* Quick Action — dekat atas, besar, tanpa perlu scroll */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex flex-col items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white p-5 text-center shadow-sm hover:bg-gray-50"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${action.bg}`}>
              <Icon name={action.icon} className={`h-6 w-6 ${action.color}`} />
            </div>
            <span className="text-base font-semibold text-gray-900">{action.label}</span>
          </Link>
        ))}
      </div>

      {/* Ringkasan hari ini */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Ringkasan Hari Ini</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="space-y-3">
            <IconChip name="flame" bg="bg-orange-50" color="text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">Kalori</p>
              <p className="text-xl font-semibold text-gray-900">{totalCaloriesToday} kkal</p>
            </div>
            {calorieTarget && (
              <>
                <ProgressBar value={calorieProgress} colorClassName="bg-orange-500" />
                <p className="text-xs text-gray-500">Target {calorieTarget} kkal</p>
              </>
            )}
          </Card>

          <Card className="space-y-3">
            <IconChip name="activity" bg="bg-green-50" color="text-green-600" />
            <div>
              <p className="text-sm text-gray-600">Aktivitas</p>
              <p className="text-xl font-semibold text-gray-900">{totalDurationToday} menit</p>
            </div>
            <p className="text-xs text-gray-500">{totalCaloriesBurnedToday} kkal terbakar</p>
          </Card>

          <Card className="space-y-3">
            <IconChip name="scale" bg="bg-blue-50" color="text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">Berat Badan</p>
              <p className="text-xl font-semibold text-gray-900">
                {latestWeight ? `${latestWeight.weight_kg} kg` : "-"}
              </p>
            </div>
          </Card>

          <Card className="space-y-3">
            <IconChip name="target" bg="bg-purple-50" color="text-purple-600" />
            <div>
              <p className="text-sm text-gray-600">BMI</p>
              <p className="text-xl font-semibold text-gray-900">{bmi ?? "-"}</p>
            </div>
            {bmi !== null && (
              <Badge variant={bmiCategory.variant}>{bmiCategory.label}</Badge>
            )}
          </Card>
        </div>
      </div>

      {/* Progress Goals */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Progress Goals</h2>
        {activeGoals && activeGoals.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activeGoals.map((goal) => {
              const pct = goal.target_value
                ? Math.min(
                    100,
                    Math.round(((goal.current_value ?? 0) / goal.target_value) * 100)
                  )
                : 0;
              return (
                <Card key={goal.id} className="flex items-center gap-4">
                  <CircularProgress value={pct} size={64} strokeWidth={6} />
                  <div>
                    <p className="font-medium text-gray-900 capitalize">
                      {goal.goal_type.replaceAll("_", " ")}
                    </p>
                    <p className="text-sm text-gray-600">
                      {goal.current_value ?? 0} / {goal.target_value ?? "-"} {goal.unit}
                    </p>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <Card>
            <EmptyState
              message="Belum ada goal aktif. Yuk buat target pertamamu!"
              icon="target"
              action={
                <Link href="/dashboard/goals">
                  <Button variant="secondary">Buat Goal</Button>
                </Link>
              }
            />
          </Card>
        )}
      </div>

      {/* Reminder Hari Ini */}
      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Reminder Hari Ini</h2>
        {todayReminders && todayReminders.length > 0 ? (
          <div className="space-y-2">
            {todayReminders.map((reminder) => (
              <Card key={reminder.id} className="flex items-center gap-3 py-3">
                <IconChip name="bell" bg="bg-yellow-50" color="text-yellow-600" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{reminder.title}</p>
                  <p className="text-sm text-gray-600">
                    {new Date(reminder.reminder_time).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
                <Badge variant={reminder.status === "active" ? "success" : "neutral"}>
                  {reminder.status}
                </Badge>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <EmptyState message="Tidak ada reminder hari ini." icon="bell" />
          </Card>
        )}
      </div>

      {/* Ringkasan Mingguan */}
      <Card>
        <div className="mb-3 flex items-center gap-2">
          <Icon name="calendar" className="h-5 w-5 text-red-600" />
          <h2 className="text-lg font-semibold text-gray-900">Ringkasan Minggu Ini</h2>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600">Total Kalori</p>
            <p className="text-xl font-semibold text-gray-900">{weeklyTotalCalories} kkal</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Catatan Makan</p>
            <p className="text-xl font-semibold text-gray-900">{weeklyLogCount}x</p>
          </div>
        </div>
      </Card>

      <Card className="max-w-sm">
        <form action={logout}>
          <Button type="submit" variant="secondary" className="w-full">
            Logout
          </Button>
        </form>
      </Card>
    </div>
  );
}
