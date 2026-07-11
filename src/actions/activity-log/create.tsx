"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CreateActivityLogState = {
  error: string | null;
};

const activityTypes = [
  "walking",
  "running",
  "cycling",
  "swimming",
  "workout",
  "yoga",
  "other",
] as const;

function numOrNull(value: FormDataEntryValue | null): number | null {
  if (!value) return null;
  const str = value.toString();
  if (!str) return null;
  const num = Number(str);
  return Number.isNaN(num) ? null : num;
}

export async function createActivityLog(
  _prevState: CreateActivityLogState,
  formData: FormData
): Promise<CreateActivityLogState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sesi tidak valid, silakan login ulang." };
  }

  const activityType = formData.get("activity_type")?.toString() ?? "";
  const activityDate = formData.get("activity_date")?.toString() ?? "";

  if (!activityTypes.includes(activityType as (typeof activityTypes)[number])) {
    return { error: "Jenis aktivitas tidak valid." };
  }

  if (!activityDate) {
    return { error: "Tanggal wajib diisi." };
  }

  const { error } = await supabase.from("activity_logs").insert({
    id: crypto.randomUUID(),
    user_id: user.id,
    activity_type: activityType,
    duration_minutes: numOrNull(formData.get("duration_minutes")),
    calories_burned: numOrNull(formData.get("calories_burned")),
    activity_date: activityDate,
    notes: formData.get("notes")?.toString() || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/activity-log");
  return { error: null };
}
