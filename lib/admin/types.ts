export type ReportStatus =
  | "pending"
  | "reviewed"
  | "dismissed"
  | "actioned";

export type SpotReport = {
  reporter_id: string;
  spot_id: string;
  reason: string | null;
  status: ReportStatus;
  created_at: string;
  resolution_notes: string | null;
  reviewed_at: string | null;
  reviewed_by: string | null;
};

export type Spot = {
  id: string;
  title: string | null;
  user_id: string;
  image_urls: string[] | null;
  is_removed: boolean | null;
  removed_at: string | null;
  removed_by: string | null;
  removal_reason: string | null;
};

export type Profile = {
  id: string;
  username: string | null;
  is_admin: boolean | null;
  is_banned: boolean | null;
  banned_at: string | null;
  banned_reason: string | null;
  banned_by: string | null;
};
