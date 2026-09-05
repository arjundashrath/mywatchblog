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

type Taxonomy = {
  category: ArticleCategory;
  priceRange: PriceRange;
  tags: string[];
};

// Canonical taxonomy for every existing article. Keeping one curated tag set per
// post avoids fragmented tag pages such as "gshock" vs "g-shock" and makes
// related-article matching predictable. New posts can still use frontmatter
// until they are added here.
const taxonomy: Record<string, Taxonomy> = {
  "alba-watches-india": {
    category: "reviews",
    priceRange: "10k-25k",
    tags: ["alba", "seiko", "japanese-watches", "chronograph", "quartz", "budget-watches", "india"],
  },
  "best-outdoor-watches": {
    category: "buying-guides",
    priceRange: "all-prices",
    tags: ["outdoor-watches", "rugged-watches", "casio", "g-shock", "garmin", "timex", "buying-guide"],
  },
  "best-watches-under-10k": {
    category: "buying-guides",
    priceRange: "5k-10k",
    tags: ["budget-watches", "under-10000", "casio", "timex", "g-shock", "titan", "buying-guide", "india"],
  },
  "best-watches-under-3k": {
    category: "buying-guides",
    priceRange: "under-5k",
    tags: ["budget-watches", "under-3000", "casio", "timex", "hmt", "buying-guide", "india"],
  },
  "best-watches-under-5k": {
    category: "buying-guides",
    priceRange: "under-5k",
    tags: ["budget-watches", "under-5000", "casio", "timex", "titan", "buying-guide", "india"],
  },
  "casio-mrw-200h-review": {
    category: "reviews",
    priceRange: "under-5k",
    tags: ["casio", "mrw-200h", "quartz", "budget-watches", "field-watch", "review", "india"],
  },
  "garmin-instinct-2x-review": {
    category: "reviews",
    priceRange: "25k-50k",
    tags: ["garmin", "instinct-2x", "outdoor-watches", "rugged-watches", "smartwatch", "gps-watch", "review"],
  },
  "japanese-watches-under-50k": {
    category: "buying-guides",
    priceRange: "25k-50k",
    tags: ["japanese-watches", "seiko", "citizen", "casio", "orient", "under-50000", "buying-guide", "india"],
  },
  "prime-day-2026-part-1": {
    category: "deals",
    priceRange: "all-prices",
    tags: ["watch-deals", "amazon", "prime-day", "casio", "timex", "seiko", "india"],
  },
  "prime-day-2026-part-2": {
    category: "deals",
    priceRange: "all-prices",
    tags: ["watch-deals", "amazon", "prime-day", "citizen", "casio", "timex", "india"],
  },
  "seiko-alternatives-citizen": {
    category: "buying-guides",
    priceRange: "all-prices",
    tags: ["seiko", "citizen", "japanese-watches", "automatic-watches", "eco-drive", "alternatives", "buying-guide", "india"],
  },
  "timex-under-10k": {
    category: "buying-guides",
    priceRange: "5k-10k",
    tags: ["timex", "budget-watches", "under-10000", "quartz", "automatic-watches", "buying-guide", "india"],
  },
  "what-makes-a-good-watch": {
    category: "learn",
    priceRange: "all-prices",
    tags: ["watch-basics", "watch-buying", "horology", "watch-movements", "watch-finishing", "water-resistance", "beginner-guide"],
  },
  "where-to-buy-watches-in-india": {
    category: "buying-guides",
    priceRange: "all-prices",
    tags: ["where-to-buy", "authorized-dealers", "watch-retailers", "online-shopping", "watch-buying", "buying-guide", "india"],
  },
  "which-gshock-to-buy-part-1": {
    category: "buying-guides",
    priceRange: "10k-25k",
    tags: ["casio", "g-shock", "rugged-watches", "digital-watches", "sports-watches", "buying-guide", "india"],
  },
};

export function getTaxonomy(post: CollectionEntry<"blog">) {
  const canonical = taxonomy[post.id];

  if (canonical) return canonical;

  return {
    category: (post.data.category ?? "buying-guides") as ArticleCategory,
    priceRange: (post.data.priceRange ?? "all-prices") as PriceRange,
    tags: post.data.tags ?? [],
  };
}

export function tagLabel(tag: string) {
  const specialLabels: Record<string, string> = {
    "g-shock": "G-Shock",
    hmt: "HMT",
    "gps-watch": "GPS Watch",
    "eco-drive": "Eco-Drive",
    "mrw-200h": "MRW-200H",
    "instinct-2x": "Instinct 2X",
  };

  if (specialLabels[tag]) return specialLabels[tag];

  return tag
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}
