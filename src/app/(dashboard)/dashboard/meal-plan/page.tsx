import { createClient } from "@/lib/supabase/server";
import MealPlanForm from "@/components/meal-plan/MealPlanForm";
import MealPlanCard from "@/components/meal-plan/MealPlanCard";
import Card from "@/components/ui/Card";
import PageHeading from "@/components/ui/PageHeading";
import EmptyState from "@/components/ui/EmptyState";

export default async function MealPlanPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: plans } = await supabase
    .from("meal_plans")
    .select(
      "id, title, plan_date, total_calories, status, meal_items(id, food_name, meal_type, serving_size, calories)"
    )
    .eq("user_id", user.id)
    .order("plan_date", { ascending: false });

  const allPlans = plans ?? [];

  return (
    <div className="space-y-6">
      <PageHeading>Rencana Makan</PageHeading>

      <MealPlanForm />

      <div>
        <h2 className="mb-3 text-lg font-semibold text-gray-900">Daftar Rencana</h2>
        {allPlans.length === 0 ? (
          <Card>
            <EmptyState message="Belum ada rencana makan." icon="calendar" />
          </Card>
        ) : (
          <div className="space-y-3">
            {allPlans.map((plan) => (
              <MealPlanCard
                key={plan.id}
                id={plan.id}
                title={plan.title}
                plan_date={plan.plan_date}
                total_calories={plan.total_calories}
                status={plan.status}
                items={plan.meal_items ?? []}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
