import { getRecentSpots } from "@/app/actions/spots";
import { getCurrentUserProfile } from "@/app/actions/users";
import { ProfileProvider } from "@/components/context/useProfile";
import { ProfilePage } from "@/components/Pages/Profile/ProfilePage";

export const dynamic = "force-dynamic";

export default async function ProfileRoute() {
  const [{ data: spots }, { data: profile }] = await Promise.all([
    getRecentSpots(4),
    getCurrentUserProfile(),
  ]);

  return (
    <ProfileProvider initialProfile={profile}>
      <ProfilePage spots={spots ?? []} />
    </ProfileProvider>
  );
}
