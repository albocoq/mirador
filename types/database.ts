export interface Spot {
  id: string;
  created_at: string;
  user_id: string;
  title: string;
  description: string | null;
  latitude: number;
  longitude: number;
  image_urls: string[];
  tags: string[];
  rating: number;
  is_hidden_gem: boolean;
}

export interface UserProfile {
  id: string;
  created_at: string;
  username: string | null;
  avatar_url: string | null;
  bio: string | null;
}

export type UserWithSpots = UserProfile & {
  spots: Spot[];
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: UserProfile & Record<string, unknown>;
        Insert: {
          id?: string;
          created_at?: string;
          username?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
        } & Record<string, unknown>;
        Update: {
          id?: string;
          created_at?: string;
          username?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
        } & Record<string, unknown>;
        Relationships: [];
      };
      spots: {
        Row: Spot & Record<string, unknown>;
        Insert: Omit<Spot, "id" | "created_at"> & {
          id?: string;
          created_at?: string;
        } & Record<string, unknown>;
        Update: Partial<Omit<Spot, "id" | "created_at">> & {
          id?: string;
          created_at?: string;
        } & Record<string, unknown>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type MapCoordinates = {
  latitude: number;
  longitude: number;
};
