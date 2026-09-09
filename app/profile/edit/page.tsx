import { getCurrentUserProfile } from "@/app/actions/users";
import { ProfileProvider } from "@/components/context/useProfile";
import EditProfilePage from "@/components/Pages/EditProfile/EditProfilePage";

export default async function EditProfileRoute() {
  const { data: profile } = await getCurrentUserProfile();

  return (
    <ProfileProvider initialProfile={profile}>
      <EditProfilePage />
    </ProfileProvider>
  );
}
