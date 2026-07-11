import { createClient } from "@/lib/supabase/server";
import { deleteGoal } from "@/actions/goals/delete";
import GoalForm from "@/components/goals/GoalForm";
import Card from "@/components/ui/Card";
import PageHeading from "@/components/ui/PageHeading";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";

const statusVariant = {
  active: "success",
  completed: "neutral",
  cancelled: "danger",
} as const;

export default async function GoalsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: entries } = user
    ? await supabase
        .from("goals")
        .select(
          "id, goal_type, target_value, current_value, unit, status"
        )
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
    : { data: [] };

  return (
    <div className="space-y-6">
      <PageHeading>Goals</PageHeading>

      <GoalForm />

      <Card className="overflow-x-auto" title="Daftar Goals">
        {!entries || entries.length === 0 ? (
          <EmptyState message="Belum ada goal." />
        ) : (
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-4">Jenis</th>
                <th className="py-2 pr-4">Progres</th>
                <th className="py-2 pr-4">Target</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4" />
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-100">
                  <td className="py-2 pr-4 capitalize">
                    {entry.goal_type.replaceAll("_", " ")}
                  </td>
                  <td className="py-2 pr-4">
                    {entry.current_value ?? "-"} {entry.unit}
                  </td>
                  <td className="py-2 pr-4">
                    {entry.target_value ?? "-"} {entry.unit}
                  </td>
                  <td className="py-2 pr-4">
                    <Badge variant={statusVariant[entry.status as keyof typeof statusVariant]}>
                      {entry.status}
                    </Badge>
                  </td>
                  <td className="py-2 pr-4">
                    <form action={deleteGoal.bind(null, entry.id)}>
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
