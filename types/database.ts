export type Database = {
  public: {
    Tables: {
      spots: {
        Row: {
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
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          title: string;
          description?: string | null;
          latitude: number;
          longitude: number;
          image_urls?: string[];
          tags?: string[];
          rating?: number;
          is_hidden_gem?: boolean;
        };
        Update: Partial<Database["public"]["Tables"]["spots"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          created_at: string;
          user: string | null;
          username: string;
          avatar_url: string | null;
          bio: string | null;
          email: string;
        };
        Insert: {
          id: string;
          created_at?: string;
          username?: string | null;
          user?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Spot = Database["public"]["Tables"]["spots"]["Row"];
export type SpotInsert = Database["public"]["Tables"]["spots"]["Insert"];

export type MapSpot = Pick<
  Spot,
  "id" | "title" | "latitude" | "longitude" | "rating" | "is_hidden_gem"
>;

export type MapCoordinates = {
  latitude: number;
  longitude: number;
};

export type UserProfile = {
  id: string;
  created_at: string;
  user: string | null;
  username: string;
  avatar_url: string | null;
  bio: string | null;
  email: string;
};
