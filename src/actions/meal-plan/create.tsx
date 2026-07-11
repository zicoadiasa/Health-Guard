"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CreateMealPlanState = {
  error: string | null;
};

const statuses = ["active", "completed", "cancelled"] as const;

function numOrNull(value: FormDataEntryValue | null): number | null {
  if (!value) return null;
  const str = value.toString();
  if (!str) return null;
  const num = Number(str);
  return Number.isNaN(num) ? null : num;
}

export async function createMealPlan(
  _prevState: CreateMealPlanState,
  formData: FormData
): Promise<CreateMealPlanState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sesi tidak valid, silakan login ulang." };
  }

  const title = formData.get("title")?.toString().trim() ?? "";
  const planDate = formData.get("plan_date")?.toString() ?? "";
  const status = formData.get("status")?.toString() ?? "";

  if (!title) {
    return { error: "Judul wajib diisi." };
  }

  if (!planDate) {
    return { error: "Tanggal wajib diisi." };
  }

  if (!statuses.includes(status as (typeof statuses)[number])) {
    return { error: "Status tidak valid." };
  }

  const { error } = await supabase.from("meal_plans").insert({
    id: crypto.randomUUID(),
    user_id: user.id,
    title,
    plan_date: planDate,
    total_calories: numOrNull(formData.get("total_calories")),
    status,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/meal-plan");
  return { error: null };
}
