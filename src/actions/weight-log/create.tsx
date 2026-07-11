"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type CreateWeightLogState = {
  error: string | null;
};

export async function createWeightLog(
  _prevState: CreateWeightLogState,
  formData: FormData
): Promise<CreateWeightLogState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sesi tidak valid, silakan login ulang." };
  }

  const weightRaw = formData.get("weight_kg")?.toString() ?? "";
  const recordedAt = formData.get("recorded_at")?.toString() ?? "";

  const weight = Number(weightRaw);

  if (!weightRaw || Number.isNaN(weight) || weight <= 0) {
    return { error: "Berat badan tidak valid." };
  }

  if (!recordedAt) {
    return { error: "Waktu pencatatan wajib diisi." };
  }

  const { error } = await supabase.from("weight_logs").insert({
    id: crypto.randomUUID(),
    user_id: user.id,
    weight_kg: weight,
    recorded_at: recordedAt,
    notes: formData.get("notes")?.toString() || null,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/dashboard/weight-log");
  return { error: null };
}
