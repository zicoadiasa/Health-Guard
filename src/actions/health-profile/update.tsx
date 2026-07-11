"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type UpdateHealthProfileState = {
  error: string | null;
  success: boolean;
};

const genders = ["male", "female"] as const;
const diabetesTypes = ["type_1", "type_2", "prediabetes", "gestational"] as const;
const activityLevels = [
  "sedentary",
  "light",
  "moderate",
  "active",
  "very_active",
] as const;

export async function updateHealthProfile(
  _prevState: UpdateHealthProfileState,
  formData: FormData
): Promise<UpdateHealthProfileState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sesi tidak valid, silakan login ulang.", success: false };
  }

  const gender = formData.get("gender")?.toString() ?? "";
  const heightRaw = formData.get("height_cm")?.toString() ?? "";
  const weightRaw = formData.get("weight_kg")?.toString() ?? "";
  const diabetesType = formData.get("diabetes_type")?.toString() ?? "";
  const activityLevel = formData.get("activity_level")?.toString() ?? "";

  if (!genders.includes(gender as (typeof genders)[number])) {
    return { error: "Gender tidak valid.", success: false };
  }

  if (diabetesType && !diabetesTypes.includes(diabetesType as (typeof diabetesTypes)[number])) {
    return { error: "Tipe diabetes tidak valid.", success: false };
  }

  if (!activityLevels.includes(activityLevel as (typeof activityLevels)[number])) {
    return { error: "Tingkat aktivitas tidak valid.", success: false };
  }

  const height_cm = heightRaw ? Number(heightRaw) : null;
  const weight_kg = weightRaw ? Number(weightRaw) : null;

  if (heightRaw && (Number.isNaN(height_cm) || (height_cm as number) <= 0)) {
    return { error: "Tinggi badan tidak valid.", success: false };
  }

  if (weightRaw && (Number.isNaN(weight_kg) || (weight_kg as number) <= 0)) {
    return { error: "Berat badan tidak valid.", success: false };
  }

  const { error } = await supabase
    .from("health_profiles")
    .update({
      gender,
      height_cm,
      weight_kg,
      diabetes_type: diabetesType || null,
      activity_level: activityLevel,
    })
    .eq("user_id", user.id);

  if (error) {
    return { error: error.message, success: false };
  }

  revalidatePath("/dashboard");
  return { error: null, success: true };
}
