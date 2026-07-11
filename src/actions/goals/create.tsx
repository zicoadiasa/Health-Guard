"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CreateGoalState = {
  error: string | null;
};

const goalTypes = [
  "lose_weight",
  "gain_weight",
  "maintain_weight",
  "reduce_blood_sugar",
  "increase_activity",
  "healthy_eating",
] as const;

const statuses = ["active", "completed", "cancelled"] as const;

function numOrNull(value: FormDataEntryValue | null): number | null {
  if (!value) return null;
  const str = value.toString();
  if (!str) return null;
  const num = Number(str);
  return Number.isNaN(num) ? null : num;
}

export async function createGoal(
  _prevState: CreateGoalState,
  formData: FormData
): Promise<CreateGoalState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sesi tidak valid, silakan login ulang." };
  }

  const goalType = formData.get("goal_type")?.toString() ?? "";
  const status = formData.get("status")?.toString() ?? "";

  if (!goalTypes.includes(goalType as (typeof goalTypes)[number])) {
    return { error: "Jenis goal tidak valid." };
  }

  if (!statuses.includes(status as (typeof statuses)[number])) {
    return { error: "Status tidak valid." };
  }

  const { error } = await supabase.from("goals").insert({
    id: crypto.randomUUID(),
    user_id: user.id,
    goal_type: goalType,
    target_value: numOrNull(formData.get("target_value")),
    current_value: numOrNull(formData.get("current_value")),
    unit: formData.get("unit")?.toString() || null,
    start_date: formData.get("start_date")?.toString() || null,
    target_date: formData.get("target_date")?.toString() || null,
    status,
    notes: formData.get("notes")?.toString() || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/goals");
  return { error: null };
}
