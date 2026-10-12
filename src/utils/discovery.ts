import type { CollectionEntry } from 'astro:content';
import { getTaxonomy } from './taxonomy';

export const budgetGuides = [
  { id: 'best-watches-under-3k', label: 'Under ₹3,000' },
  { id: 'best-watches-under-5k', label: 'Under ₹5,000' },
  { id: 'best-watches-under-10k', label: 'Under ₹10,000' },
  { id: 'best-watches-under-20k', label: 'Under ₹20,000' },
  { id: 'womens-watches-under-15k', label: "Women's watches under ₹15,000" },
];

export function getRelatedPosts(post: CollectionEntry<'blog'>, allPosts: CollectionEntry<'blog'>[]) {
  const curated = (post.data.relatedPosts ?? []).map((id) => {
    const candidate = allPosts.find((entry) => entry.id === id);
    if (!candidate || id === post.id) throw new Error(`Invalid related article '${id}' on '${post.id}'`);
    return candidate;
  });
  const taxonomy = getTaxonomy(post);
  const genericTags = new Set(['india', 'buying-guide', 'guide', 'review', 'budget', 'budget-watches']);
  const fallback = allPosts
    .filter((candidate) => candidate.id !== post.id && !curated.some((entry) => entry.id === candidate.id))
    // Sale coverage belongs in Deals, rather than evergreen reading recommendations.
    .filter((candidate) => getTaxonomy(candidate).category !== 'deals')
    .map((candidate) => {
      const other = getTaxonomy(candidate);
      const sharedTags = other.tags.filter((tag) => !genericTags.has(tag) && taxonomy.tags.includes(tag)).length;
      const samePrice = taxonomy.priceRange !== 'all-prices' && other.priceRange === taxonomy.priceRange;
      return { post: candidate, score: sharedTags * 3 + (samePrice ? 3 : 0) + (other.category === taxonomy.category ? 1 : 0) };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || a.post.id.localeCompare(b.post.id))
    .map((item) => item.post);
  return [...curated, ...fallback].slice(0, 3);
}
