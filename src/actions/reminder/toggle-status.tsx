"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export async function toggleReminderStatus(id: string, currentStatus: string) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return;
  }

  const nextStatus = currentStatus === "active" ? "inactive" : "active";

  await supabase
    .from("reminders")
    .update({ status: nextStatus })
    .eq("id", id)
    .eq("user_id", user.id);

  revalidatePath("/dashboard/reminder");
}
