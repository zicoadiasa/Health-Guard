import { getCurrentUserProfile } from "@/lib/supabase/server";
import { logout } from "@/actions/auth/logout";
import SettingsForm from "@/components/settings/SettingsForm";
import PageHeading from "@/components/ui/PageHeading";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import { formatDisplayName } from "@/lib/format";

export default async function SettingsPage() {
  const data = await getCurrentUserProfile();

  if (!data?.profile) return null;

  const displayName = formatDisplayName(data.profile.full_name);
  const initial = displayName.charAt(0).toUpperCase() || "?";

  return (
    <div className="space-y-6">
      <PageHeading>Pengaturan</PageHeading>

      <Card className="flex items-center gap-4">
        {data.profile.avatar_url ? (
          <img
            src={data.profile.avatar_url}
            alt={displayName}
            className="h-16 w-16 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-red-50 text-2xl font-semibold text-red-600">
            {initial}
          </div>
        )}
        <div>
          <p className="text-lg font-semibold text-gray-900">{displayName}</p>
          <p className="text-sm text-gray-500">{data.profile.email}</p>
        </div>
      </Card>

      <SettingsForm
        fullName={data.profile.full_name}
        email={data.profile.email}
        avatarUrl={data.profile.avatar_url}
      />

      <Card title="Keamanan">
        <p className="mb-4 text-sm text-gray-600">
          Keluar dari akun HealthGuard di perangkat ini.
        </p>
        <form action={logout}>
          <Button type="submit" variant="secondary">
            Logout
          </Button>
        </form>
      </Card>
    </div>
  );
}
