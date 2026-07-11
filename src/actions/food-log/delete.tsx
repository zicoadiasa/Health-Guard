"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function deleteFoodLog(id: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  await supabase.from("food_logs").delete().eq("id", id).eq("user_id", user.id);

  revalidatePath("/dashboard/food-log");
}
