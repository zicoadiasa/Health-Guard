"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CreateFoodLogState = {
  error: string | null;
};

const mealTypes = ["breakfast", "lunch", "dinner", "snack"] as const;

function numOrNull(value: FormDataEntryValue | null): number | null {
  if (!value) return null;
  const str = value.toString();
  if (!str) return null;
  const num = Number(str);
  return Number.isNaN(num) ? null : num;
}

export async function createFoodLog(
  _prevState: CreateFoodLogState,
  formData: FormData
): Promise<CreateFoodLogState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sesi tidak valid, silakan login ulang." };
  }

  const foodName = formData.get("food_name")?.toString().trim() ?? "";
  const mealType = formData.get("meal_type")?.toString() ?? "";
  const consumedAt = formData.get("consumed_at")?.toString() ?? "";

  if (!foodName) {
    return { error: "Nama makanan wajib diisi." };
  }

  if (!mealTypes.includes(mealType as (typeof mealTypes)[number])) {
    return { error: "Jenis makan tidak valid." };
  }

  if (!consumedAt) {
    return { error: "Waktu konsumsi wajib diisi." };
  }

  const { error } = await supabase.from("food_logs").insert({
    id: crypto.randomUUID(),
    user_id: user.id,
    food_name: foodName,
    meal_type: mealType,
    serving_size: numOrNull(formData.get("serving_size")),
    calories: numOrNull(formData.get("calories")),
    protein: numOrNull(formData.get("protein")),
    carbohydrates: numOrNull(formData.get("carbohydrates")),
    fat: numOrNull(formData.get("fat")),
    fiber: numOrNull(formData.get("fiber")),
    sugar: numOrNull(formData.get("sugar")),
    consumed_at: consumedAt,
    notes: formData.get("notes")?.toString() || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/food-log");
  return { error: null };
}
