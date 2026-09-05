import type { CollectionEntry } from "astro:content";

export type ArticleCategory = "buying-guides" | "reviews" | "learn" | "deals";
export type PriceRange = "under-5k" | "5k-10k" | "10k-25k" | "25k-50k" | "50k-plus" | "all-prices";

export const categoryLabels: Record<ArticleCategory, string> = {
  "buying-guides": "Buying Guides",
  reviews: "Reviews",
  learn: "Learn",
  deals: "Deals",
};

export const priceLabels: Record<PriceRange, string> = {
  "under-5k": "Under ₹5,000",
  "5k-10k": "₹5K–₹10K",
  "10k-25k": "₹10K–₹25K",
  "25k-50k": "₹25K–₹50K",
  "50k-plus": "₹50K+",
  "all-prices": "All Prices",
};

const fallback: Record<string, { category: ArticleCategory; priceRange: PriceRange; tags: string[] }> = {
  "alba-watches-india": { category: "reviews", priceRange: "10k-25k", tags: ["alba", "japanese-watches", "chronograph", "quartz"] },
  "best-outdoor-watches": { category: "buying-guides", priceRange: "all-prices", tags: ["outdoor", "rugged-watches", "g-shock", "garmin"] },
  "best-watches-under-10k": { category: "buying-guides", priceRange: "5k-10k", tags: ["budget-watches", "under-10000", "india"] },
  "best-watches-under-3k": { category: "buying-guides", priceRange: "under-5k", tags: ["budget-watches", "under-3000", "india"] },
  "best-watches-under-5k": { category: "buying-guides", priceRange: "under-5k", tags: ["budget-watches", "under-5000", "india"] },
  "casio-mrw-200h-review": { category: "reviews", priceRange: "under-5k", tags: ["casio", "quartz", "budget-watches", "review"] },
  "garmin-instinct-2x-review": { category: "reviews", priceRange: "25k-50k", tags: ["garmin", "outdoor", "smartwatch", "review"] },
  "japanese-watches-under-50k": { category: "buying-guides", priceRange: "25k-50k", tags: ["japanese-watches", "seiko", "citizen", "casio"] },
  "prime-day-2026-part-1": { category: "deals", priceRange: "all-prices", tags: ["deals", "amazon", "prime-day", "india"] },
  "prime-day-2026-part-2": { category: "deals", priceRange: "all-prices", tags: ["deals", "amazon", "prime-day", "india"] },
  "seiko-alternatives-citizen": { category: "buying-guides", priceRange: "all-prices", tags: ["seiko", "citizen", "japanese-watches", "alternatives"] },
  "timex-under-10k": { category: "buying-guides", priceRange: "5k-10k", tags: ["timex", "budget-watches", "under-10000", "india"] },
  "what-makes-a-good-watch": { category: "learn", priceRange: "all-prices", tags: ["watch-buying", "horology", "quality", "beginner-guide"] },
  "which-gshock-to-buy-part-1": { category: "buying-guides", priceRange: "10k-25k", tags: ["casio", "g-shock", "rugged-watches", "buying-guide"] },
};

export function getTaxonomy(post: CollectionEntry<"blog">) {
  const defaults = fallback[post.id] ?? { category: "buying-guides" as ArticleCategory, priceRange: "all-prices" as PriceRange, tags: [] };
  return {
    category: (post.data.category ?? defaults.category) as ArticleCategory,
    priceRange: (post.data.priceRange ?? defaults.priceRange) as PriceRange,
    tags: post.data.tags?.length ? post.data.tags : defaults.tags,
  };
}

export function tagLabel(tag: string) {
  return tag
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
