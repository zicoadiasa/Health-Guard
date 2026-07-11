"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CreateBloodSugarLogState = {
  error: string | null;
};

export async function createBloodSugarLog(
  _prevState: CreateBloodSugarLogState,
  formData: FormData
): Promise<CreateBloodSugarLogState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sesi tidak valid, silakan login ulang." };
  }

  const levelRaw = formData.get("blood_sugar_level")?.toString() ?? "";
  const measuredAt = formData.get("measured_at")?.toString() ?? "";

  const level = Number(levelRaw);

  if (!levelRaw || Number.isNaN(level) || level <= 0) {
    return { error: "Kadar gula darah tidak valid." };
  }

  if (!measuredAt) {
    return { error: "Waktu pengukuran wajib diisi." };
  }

  const { error } = await supabase.from("blood_sugar_logs").insert({
    id: crypto.randomUUID(),
    user_id: user.id,
    blood_sugar_level: level,
    measured_at: measuredAt,
    notes: formData.get("notes")?.toString() || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/blood-sugar-log");
  return { error: null };
}
