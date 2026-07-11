"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteMealItem(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  // meal_items has no user_id column; ownership is enforced by RLS via the
  // parent meal_plans row (see "Users manage own meal items" policy).
  await supabase.from("meal_items").delete().eq("id", id);

  revalidatePath("/dashboard/meal-plan");
}
