import { Loader2 } from "lucide-react";

export default function EditProfileSubmit({
  isLoading,
}: {
  isLoading: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className="mt-10 flex w-full items-center justify-center rounded-full bg-linear-to-r from-amber-500 to-orange-500 py-4 text-[15px] font-bold text-[#3e1c00] shadow-[0_4px_20px_rgba(245,158,11,0.3)] transition-all hover:opacity-90 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
    >
      {isLoading ? <Loader2 className="size-5 animate-spin" /> : "Save Changes"}
    </button>
  );
}
