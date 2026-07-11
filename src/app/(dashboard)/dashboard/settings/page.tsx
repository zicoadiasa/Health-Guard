import { getCurrentUserProfile } from "@/lib/supabase/server";
import SettingsForm from "@/components/settings/SettingsForm";
import PageHeading from "@/components/ui/PageHeading";

export default async function SettingsPage() {
  const data = await getCurrentUserProfile();

  return (
    <div className="space-y-6">
      <PageHeading>Settings</PageHeading>

      {data?.profile && (
        <SettingsForm
          fullName={data.profile.full_name}
          email={data.profile.email}
          avatarUrl={data.profile.avatar_url}
        />
      )}
    </div>
  );
}
