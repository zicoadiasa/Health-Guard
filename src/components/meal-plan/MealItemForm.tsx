"use client";

import { useActionState, useEffect, useRef } from "react";
import {
  createMealItem,
  type CreateMealItemState,
} from "@/actions/meal-items/create";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import FoodReferenceSearch from "@/components/nutrition/FoodReferenceSearch";
import type { FoodReferenceItem } from "@/lib/nutrition/food-reference";

const initialState: CreateMealItemState = { error: null, success: false };

type MealItemFormProps = {
  mealPlanId: string;
  mealType: string;
  onDone: () => void;
};

export default function MealItemForm({
  mealPlanId,
  mealType,
  onDone,
}: MealItemFormProps) {
  const [state, formAction, isPending] = useActionState(
    createMealItem,
    initialState
  );
  const caloriesRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (state.success) {
      onDone();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.success]);

  function handleSelectReference(item: FoodReferenceItem) {
    if (caloriesRef.current) caloriesRef.current.value = String(item.calories);
  }

  return (
    <form
      action={formAction}
      className="mt-2 space-y-3 rounded-lg border border-gray-200 bg-gray-50 p-3"
    >
      {state.error && <Alert variant="error">{state.error}</Alert>}
      <input type="hidden" name="meal_plan_id" value={mealPlanId} />
      <input type="hidden" name="meal_type" value={mealType} />

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <FoodReferenceSearch
          id={`food_name_${mealType}`}
          name="food_name"
          onSelect={handleSelectReference}
        />
        <Input
          label="Porsi (gram)"
          id={`serving_size_${mealType}`}
          name="serving_size"
          type="number"
          step="0.1"
          min="0"
        />
        <Input
          ref={caloriesRef}
          label="Kalori"
          id={`calories_${mealType}`}
          name="calories"
          type="number"
          min="0"
        />
      </div>

      <div className="flex gap-2">
        <Button type="submit" disabled={isPending} className="flex-1 sm:flex-none">
          {isPending ? "Menyimpan..." : "Tambah"}
        </Button>
        <Button type="button" variant="secondary" onClick={onDone}>
          Batal
        </Button>
      </div>
    </form>
  );
}
