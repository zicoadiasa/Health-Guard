"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CreateMealItemState = {
  error: string | null;
  success: boolean;
};

const mealTypes = ["breakfast", "lunch", "dinner", "snack"] as const;

function numOrNull(value: FormDataEntryValue | null): number | null {
  if (!value) return null;
  const str = value.toString();
  if (!str) return null;
  const num = Number(str);
  return Number.isNaN(num) ? null : num;
}

export async function createMealItem(
  _prevState: CreateMealItemState,
  formData: FormData
): Promise<CreateMealItemState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sesi tidak valid, silakan login ulang.", success: false };
  }

  const mealPlanId = formData.get("meal_plan_id")?.toString() ?? "";
  const mealType = formData.get("meal_type")?.toString() ?? "";
  const foodName = formData.get("food_name")?.toString().trim() ?? "";

  if (!mealPlanId) {
    return { error: "Rencana makan tidak valid.", success: false };
  }

  if (!mealTypes.includes(mealType as (typeof mealTypes)[number])) {
    return { error: "Jenis makan tidak valid.", success: false };
  }

  if (!foodName) {
    return { error: "Nama makanan wajib diisi.", success: false };
  }

  const { error } = await supabase.from("meal_items").insert({
    id: crypto.randomUUID(),
    meal_plan_id: mealPlanId,
    food_name: foodName,
    meal_type: mealType,
    serving_size: numOrNull(formData.get("serving_size")),
    calories: numOrNull(formData.get("calories")),
  });

  if (error) {
    return { error: error.message, success: false };
  }

  revalidatePath("/dashboard/meal-plan");
  return { error: null, success: true };
}
