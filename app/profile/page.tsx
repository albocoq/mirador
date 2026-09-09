import { getSpots } from "@/app/actions/spots";
import { getCurrentUserProfile } from "@/app/actions/users";
import { ProfileProvider } from "@/components/context/useProfile";
import { ProfilePage } from "@/components/Pages/Profile/ProfilePage";

export default async function ProfileRoute() {
  const [{ data: spots }, { data: profile }] = await Promise.all([
    getSpots(),
    getCurrentUserProfile(),
  ]);

  console.log("ProfileRoute: spots", spots);

  return (
    <ProfileProvider initialProfile={profile}>
      <ProfilePage spots={spots ?? []} />
    </ProfileProvider>
  );
}
