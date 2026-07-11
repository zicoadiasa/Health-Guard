"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type UpdateSettingsState = {
  error: string | null;
  success: boolean;
};

export async function updateSettings(
  _prevState: UpdateSettingsState,
  formData: FormData
): Promise<UpdateSettingsState> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { error: "Sesi tidak valid, silakan login ulang.", success: false };
  }

  const fullName = formData.get("full_name")?.toString().trim() ?? "";

  if (!fullName) {
    return { error: "Nama lengkap wajib diisi.", success: false };
  }

  const { error } = await supabase
    .from("users")
    .update({
      full_name: fullName,
      avatar_url: formData.get("avatar_url")?.toString() || null,
    })
    .eq("id", user.id);

  if (error) {
    return { error: error.message, success: false };
  }

  revalidatePath("/dashboard/settings");
  return { error: null, success: true };
}
