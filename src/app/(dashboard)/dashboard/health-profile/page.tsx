import { getCurrentUserProfile } from "@/lib/supabase/server";
import HealthProfileForm from "@/components/health-profile/HealthProfileForm";
import PageHeading from "@/components/ui/PageHeading";

export default async function HealthProfilePage() {
  const data = await getCurrentUserProfile();

  return (
    <div className="space-y-6">
      <PageHeading>Profil Kesehatan</PageHeading>

      {data?.healthProfile && (
        <HealthProfileForm
          gender={data.healthProfile.gender}
          height_cm={data.healthProfile.height_cm}
          weight_kg={data.healthProfile.weight_kg}
          diabetes_type={data.healthProfile.diabetes_type}
          activity_level={data.healthProfile.activity_level}
          updated_at={data.healthProfile.updated_at}
        />
      )}
    </div>
  );
}
