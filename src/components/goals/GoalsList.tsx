import { deleteGoal } from "@/actions/goals/delete";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import CircularProgress from "@/components/ui/CircularProgress";
import EmptyState from "@/components/ui/EmptyState";
import { translateGoalType, translateStatus } from "@/lib/labels";

type GoalEntry = {
  id: string;
  goal_type: string;
  target_value: number | null;
  current_value: number | null;
  unit: string | null;
  status: string;
};

type GoalsListProps = {
  entries: GoalEntry[];
};

const statusVariant = {
  active: "success",
  completed: "neutral",
  cancelled: "danger",
} as const;

export default function GoalsList({ entries }: GoalsListProps) {
  if (entries.length === 0) {
    return (
      <Card>
        <EmptyState message="Belum ada goal." icon="target" />
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {entries.map((goal) => {
        const pct = goal.target_value
          ? Math.min(100, Math.round(((goal.current_value ?? 0) / goal.target_value) * 100))
          : 0;
        return (
          <Card key={goal.id} className="space-y-3">
            <div className="flex items-center gap-4">
              <CircularProgress value={pct} size={64} strokeWidth={6} />
              <div>
                <p className="font-medium text-gray-900">{translateGoalType(goal.goal_type)}</p>
                <p className="text-sm text-gray-600">
                  {goal.current_value ?? 0} / {goal.target_value ?? "-"} {goal.unit}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-between border-t border-gray-100 pt-3">
              <Badge variant={statusVariant[goal.status as keyof typeof statusVariant] ?? "neutral"}>
                {translateStatus(goal.status)}
              </Badge>
              <form action={deleteGoal.bind(null, goal.id)}>
                <button type="submit" className="text-sm text-red-600 hover:underline">
                  Hapus
                </button>
              </form>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
