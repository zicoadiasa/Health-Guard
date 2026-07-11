"use client";

import { useState } from "react";
import { deleteMealPlan } from "@/actions/meal-plan/delete";
import { deleteMealItem } from "@/actions/meal-items/delete";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Icon from "@/components/ui/Icon";
import MealItemForm from "@/components/meal-plan/MealItemForm";
import { translateMealType, translateStatus } from "@/lib/labels";

type MealItem = {
  id: string;
  food_name: string;
  meal_type: string;
  serving_size: number | null;
  calories: number | null;
};

type MealPlanCardProps = {
  id: string;
  title: string;
  plan_date: string;
  total_calories: number | null;
  status: string;
  items: MealItem[];
};

const statusVariant = {
  active: "success",
  completed: "neutral",
  cancelled: "danger",
} as const;

const mealSlots = ["breakfast", "lunch", "dinner", "snack"] as const;

export default function MealPlanCard({
  id,
  title,
  plan_date,
  total_calories,
  status,
  items,
}: MealPlanCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [addingSlot, setAddingSlot] = useState<string | null>(null);

  const totalItemCalories = items.reduce((sum, item) => sum + (item.calories ?? 0), 0);

  return (
    <Card>
      <button
        type="button"
        className="flex w-full flex-wrap items-center justify-between gap-3 text-left"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <div>
          <p className="font-semibold text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">
            {new Date(plan_date).toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {total_calories !== null && (
            <span className="text-sm text-gray-500">
              {totalItemCalories}/{total_calories} kkal
            </span>
          )}
          <Badge variant={statusVariant[status as keyof typeof statusVariant] ?? "neutral"}>
            {translateStatus(status)}
          </Badge>
          <Icon
            name={isExpanded ? "check" : "plus"}
            className="h-4 w-4 text-gray-400"
          />
        </div>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-5 border-t border-gray-100 pt-4">
          {mealSlots.map((slot) => {
            const slotItems = items.filter((item) => item.meal_type === slot);
            return (
              <div key={slot}>
                <div className="mb-2 flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-700">
                    {translateMealType(slot)}
                  </h4>
                  <button
                    type="button"
                    className="text-sm font-medium text-red-600 hover:underline"
                    onClick={() =>
                      setAddingSlot((prev) => (prev === slot ? null : slot))
                    }
                  >
                    + Tambah
                  </button>
                </div>

                {slotItems.length === 0 && addingSlot !== slot && (
                  <p className="text-sm text-gray-400">Belum ada menu.</p>
                )}

                {slotItems.length > 0 && (
                  <div className="space-y-2">
                    {slotItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2"
                      >
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {item.food_name}
                          </p>
                          {item.serving_size && (
                            <p className="text-xs text-gray-500">
                              {item.serving_size} g
                            </p>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-gray-600">
                            {item.calories ?? "-"} kkal
                          </span>
                          <form action={deleteMealItem.bind(null, item.id)}>
                            <button
                              type="submit"
                              className="text-xs text-red-600 hover:underline"
                            >
                              Hapus
                            </button>
                          </form>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {addingSlot === slot && (
                  <MealItemForm
                    mealPlanId={id}
                    mealType={slot}
                    onDone={() => setAddingSlot(null)}
                  />
                )}
              </div>
            );
          })}

          <form action={deleteMealPlan.bind(null, id)}>
            <button type="submit" className="text-sm text-red-600 hover:underline">
              Hapus Rencana Ini
            </button>
          </form>
        </div>
      )}
    </Card>
  );
}
