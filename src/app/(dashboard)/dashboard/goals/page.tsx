import { createClient } from "@/lib/supabase/server";
import GoalForm from "@/components/goals/GoalForm";
import GoalsList from "@/components/goals/GoalsList";
import Card from "@/components/ui/Card";
import PageHeading from "@/components/ui/PageHeading";
import IconChip from "@/components/ui/IconChip";

export default async function GoalsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: entries } = await supabase
    .from("goals")
    .select("id, goal_type, target_value, current_value, unit, status")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const allGoals = entries ?? [];
  const activeGoals = allGoals.filter((goal) => goal.status === "active");
  const otherGoals = allGoals.filter((goal) => goal.status !== "active");

  const progressList = activeGoals.map((goal) =>
    goal.target_value ? ((goal.current_value ?? 0) / goal.target_value) * 100 : 0
  );
  const avgProgress =
    progressList.length > 0
      ? Math.round(progressList.reduce((sum, p) => sum + p, 0) / progressList.length)
      : 0;

  const insightSentence =
    activeGoals.length === 0
      ? "Belum ada goal aktif. Yuk mulai dengan satu target sederhana."
      : `Kamu punya ${activeGoals.length} goal aktif dengan rata-rata progres ${avgProgress}%.`;

  return (
    <div className="space-y-6">
      <PageHeading>Goals</PageHeading>

      <Card>
        <div className="flex items-center gap-4">
          <IconChip name="target" bg="bg-purple-50" color="text-purple-600" />
          <p className="text-sm text-gray-700">{insightSentence}</p>
        </div>
      </Card>

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Goal Aktif</h2>
        <GoalsList entries={activeGoals} />
      </div>

      {otherGoals.length > 0 && (
        <div>
          <h2 className="mb-3 text-lg font-semibold text-gray-900">Riwayat Goal</h2>
          <GoalsList entries={otherGoals} />
        </div>
      )}

      <GoalForm />
    </div>
  );
}
