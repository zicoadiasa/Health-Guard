"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CreateReminderState = {
  error: string | null;
};

const reminderTypes = [
  "meal",
  "exercise",
  "blood_sugar",
  "medication",
  "weight",
  "custom",
] as const;

export async function createReminder(
  _prevState: CreateReminderState,
  formData: FormData
): Promise<CreateReminderState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sesi tidak valid, silakan login ulang." };
  }

  const title = formData.get("title")?.toString().trim() ?? "";
  const reminderType = formData.get("reminder_type")?.toString() ?? "";
  const reminderTime = formData.get("reminder_time")?.toString() ?? "";

  if (!title) {
    return { error: "Judul wajib diisi." };
  }

  if (!reminderTypes.includes(reminderType as (typeof reminderTypes)[number])) {
    return { error: "Jenis reminder tidak valid." };
  }

  if (!reminderTime) {
    return { error: "Waktu wajib diisi." };
  }

  const { error } = await supabase.from("reminders").insert({
    id: crypto.randomUUID(),
    user_id: user.id,
    title,
    description: formData.get("description")?.toString() || null,
    reminder_type: reminderType,
    reminder_time: reminderTime,
    status: "active",
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/reminder");
  return { error: null };
}
