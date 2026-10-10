import { ClothingItem, StyleCategory, StyleProfile, AnalysisResult } from "@/types";

export function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const cleanHex = hex.replace("#", "");
  return {
    r: parseInt(cleanHex.substring(0, 2), 16) || 0,
    g: parseInt(cleanHex.substring(2, 4), 16) || 0,
    b: parseInt(cleanHex.substring(4, 6), 16) || 0,
  };
}

export function calculateColorCompatibility(
  shirtColor: string,
  pantsColor: string,
  shoesColor: string
): number {
  const shirt = hexToRgb(shirtColor);
  const pants = hexToRgb(pantsColor);
  const shoes = hexToRgb(shoesColor);

  const shirtPantsDifference =
    Math.abs(shirt.r - pants.r) +
    Math.abs(shirt.g - pants.g) +
    Math.abs(shirt.b - pants.b);

  const pantsShoesDifference =
    Math.abs(pants.r - shoes.r) +
    Math.abs(pants.g - shoes.g) +
    Math.abs(pants.b - shoes.b);

  let score = 100;

  if (shirtPantsDifference > 400) {
    score -= 15;
  }
  if (pantsShoesDifference > 400) {
    score -= 15;
  }
  if (shirtPantsDifference > 600) {
    score -= 15;
  }

  return Math.max(50, Math.min(100, score));
}

export function calculateStyleScore(
  shirt: ClothingItem,
  pants: ClothingItem,
  shoes: ClothingItem
): StyleProfile {
  const styles: StyleCategory[] = ["casual", "modern", "streetwear", "formal", "elegant"];
  const result = {} as StyleProfile;

  styles.forEach((style) => {
    result[style] = Math.round(
      (shirt.style[style] + pants.style[style] + shoes.style[style]) / 3
    );
  });

  return result;
}

export function calculateCombinationScore(
  shirt: ClothingItem,
  pants: ClothingItem,
  shoes: ClothingItem
): number {
  let score = 100;

  // Formal + streetwear terlalu jauh
  if (shirt.style.formal > 80 && pants.style.streetwear > 80) {
    score -= 20;
  }
  if (shirt.style.streetwear > 80 && pants.style.formal > 80) {
    score -= 20;
  }

  // Elegant + cargo / streetwear kurang selaras
  if (shirt.style.elegant > 80 && pants.style.streetwear > 85) {
    score -= 15;
  }

  return Math.max(60, score);
}

export function getDominantStyle(scores: StyleProfile): StyleCategory {
  let dominant: StyleCategory = "casual";
  let highest = scores.casual;

  (Object.keys(scores) as StyleCategory[]).forEach((style) => {
    if (scores[style] > highest) {
      highest = scores[style];
      dominant = style;
    }
  });

  return dominant;
}

export function getStyleName(style: StyleCategory | string): string {
  const names: Record<string, string> = {
    casual: "Casual",
    modern: "Modern",
    streetwear: "Streetwear",
    formal: "Formal",
    elegant: "Elegant",
    hijab: "Hijab",
  };

  return names[style] || style;
}

export function generateRecommendation(
  style: StyleCategory,
  colorScore: number,
  combinationScore: number
): string {
  const styleText = getStyleName(style);

  if (colorScore >= 85 && combinationScore >= 85) {
    return `Outfit kamu memiliki kombinasi yang cukup harmonis. Gaya <strong>${styleText}</strong> juga terlihat konsisten sehingga cocok digunakan untuk aktivitas kampus sehari-hari.`;
  }

  if (colorScore < 75) {
    return `Gaya <strong>${styleText}</strong> sudah terlihat dari pilihan item, tetapi kombinasi warnanya masih bisa dibuat lebih harmonis. Coba gunakan warna netral seperti putih, hitam, beige, abu-abu, atau navy.`;
  }

  if (combinationScore < 75) {
    return `Warna outfit sudah cukup sesuai, tetapi beberapa jenis item memiliki karakter style yang berbeda. Coba gunakan item dengan karakter yang lebih seragam agar outfit terlihat lebih cohesive.`;
  }

  return `Outfit kamu sudah cukup sesuai. Gaya <strong>${styleText}</strong> memberikan kesan yang cocok untuk digunakan di lingkungan kampus.`;
}

export function analyzeOutfit(
  shirt: ClothingItem,
  pants: ClothingItem,
  shoes: ClothingItem,
  shirtColor: string,
  pantsColor: string,
  shoesColor: string
): AnalysisResult {
  const styleScores = calculateStyleScore(shirt, pants, shoes);
  const dominantStyle = getDominantStyle(styleScores);
  const styleScore = styleScores[dominantStyle];
  const combinationScore = calculateCombinationScore(shirt, pants, shoes);
  const colorScore = calculateColorCompatibility(shirtColor, pantsColor, shoesColor);

  const overall = Math.round(
    styleScore * 0.45 + combinationScore * 0.25 + colorScore * 0.3
  );

  const dominantName = getStyleName(dominantStyle);

  return {
    style: dominantName,
    score: overall,
    styleCompatibility: combinationScore,
    colorScore: colorScore,
    description: `Outfit kamu memiliki karakter ${dominantName} dengan skor keseluruhan ${overall}/100.`,
    recommendation: generateRecommendation(dominantStyle, colorScore, combinationScore),
    styleScores,
    shirt: {
      name: shirt.name,
      image: shirt.image,
      color: shirtColor,
    },
    pants: {
      name: pants.name,
      image: pants.image,
      color: pantsColor,
    },
    shoes: {
      name: shoes.name,
      image: shoes.image,
      color: shoesColor,
    },
  };
}
