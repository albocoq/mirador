import { getSpots } from "@/app/actions/spots";
import { getCurrentUserProfile } from "@/app/actions/users";
import { ProfileProvider } from "@/components/context/useProfile";
import { ProfilePage } from "@/components/Pages/Profile/ProfilePage";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

export default async function ProfileRoute() {
  const [{ data: spots }, { data: profile }] = await Promise.all([
    getSpots(),
    getCurrentUserProfile(),
  ]);


  return (
    <ProfileProvider initialProfile={profile}>
      <ProfilePage spots={spots ?? []} />
    </ProfileProvider>
  );
}
