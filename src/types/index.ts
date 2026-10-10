export interface StyleProfile {
  casual: number;
  modern: number;
  streetwear: number;
  formal: number;
  elegant: number;
}

export type StyleCategory = keyof StyleProfile;

export interface ClothingItem {
  id: number;
  name: string;
  image: string;
  style: StyleProfile;
}

export interface OutfitResultItem {
  name: string;
  image: string;
  color?: string;
}

export interface AnalysisResult {
  style: string;
  score: number;
  styleCompatibility: number;
  colorScore: number;
  description: string;
  recommendation: string;
  styleScores: StyleProfile;
  shirt: OutfitResultItem;
  pants: OutfitResultItem;
  shoes: OutfitResultItem;
}

export interface SavedOutfit {
  style: string;
  score: number;
  shirt: OutfitResultItem;
  pants: OutfitResultItem;
  shoes: OutfitResultItem;
  savedAt?: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  profileImage: string;
  outfitHistory: SavedOutfit[];
}

export interface GalleryOutfit {
  id?: number;
  title: string;
  category: "casual" | "formal" | "streetwear" | "elegant" | "hijab";
  image: string;
  description: string;
  tags: string[];
}
