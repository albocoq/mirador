export type ProfilePageProps = {
  spots: import("@/types/database").Spot[];
};

export type DisplaySpot = {
  id?: string;
  title: string;
  location: string;
  rating: string;
  azimuth: string;
  image: string;
  liked?: boolean;
};

export type ProfileView = "spots" | "saved";
