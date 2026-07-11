import { createClient } from "@/lib/supabase/server";
import { deleteMealPlan } from "@/actions/meal-plan/delete";
import MealPlanForm from "@/components/meal-plan/MealPlanForm";
import Card from "@/components/ui/Card";
import PageHeading from "@/components/ui/PageHeading";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";

const statusVariant = {
  active: "success",
  completed: "neutral",
  cancelled: "danger",
} as const;

export default async function MealPlanPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: entries } = user
    ? await supabase
        .from("meal_plans")
        .select("id, title, plan_date, total_calories, status")
        .eq("user_id", user.id)
        .order("plan_date", { ascending: false })
    : { data: [] };

  return (
    <div className="space-y-6">
      <PageHeading>Meal Plan</PageHeading>

      <MealPlanForm />

      <Card className="overflow-x-auto" title="Daftar Meal Plan">
        {!entries || entries.length === 0 ? (
          <EmptyState message="Belum ada rencana makan." />
        ) : (
          <table className="w-full min-w-[560px] text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 text-gray-500">
                <th className="py-2 pr-4">Judul</th>
                <th className="py-2 pr-4">Tanggal</th>
                <th className="py-2 pr-4">Kalori</th>
                <th className="py-2 pr-4">Status</th>
                <th className="py-2 pr-4" />
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-b border-gray-100">
                  <td className="py-2 pr-4">{entry.title}</td>
                  <td className="py-2 pr-4">{entry.plan_date}</td>
                  <td className="py-2 pr-4">{entry.total_calories ?? "-"}</td>
                  <td className="py-2 pr-4">
                    <Badge variant={statusVariant[entry.status as keyof typeof statusVariant]}>
                      {entry.status}
                    </Badge>
                  </td>
                  <td className="py-2 pr-4">
                    <form action={deleteMealPlan.bind(null, entry.id)}>
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
