import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll is called from a Server Component where cookies can't
            // be written. Safe to ignore when middleware refreshes sessions.
          }
        },
      },
    }
  );
}

export async function getCurrentUserProfile() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const [{ data: profile }, { data: healthProfile }] = await Promise.all([
    supabase
      .from("users")
      .select("full_name, email, avatar_url")
      .eq("id", user.id)
      .single(),
    supabase
      .from("health_profiles")
      .select("gender, height_cm, weight_kg, diabetes_type, activity_level, updated_at")
      .eq("user_id", user.id)
      .single(),
  ]);

  return { profile, healthProfile };
}
