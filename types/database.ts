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
