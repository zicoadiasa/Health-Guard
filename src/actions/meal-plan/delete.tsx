"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteMealPlan(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await supabase.from("meal_plans").delete().eq("id", id).eq("user_id", user.id);

  revalidatePath("/dashboard/meal-plan");
}
