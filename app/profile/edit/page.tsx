import { getCurrentUserProfile } from "@/app/actions/users";
import { ProfileProvider } from "@/components/context/useProfile";
import EditProfilePage from "@/components/Pages/EditProfile/EditProfilePage";
import { redirect } from "next/navigation";

export default async function EditProfileRoute() {
  const { data: profile } = await getCurrentUserProfile();

  if (!profile) {
    redirect("/login");
  }

  return (
    <ProfileProvider initialProfile={profile}>
      <EditProfilePage />
    </ProfileProvider>
  );
}
