# Phase 3: Organic discovery

## Implemented in this change

- Evergreen `/watch-buying-guides/` hub, linked from navigation and buying-guide articles.
- Direct homepage links to the ₹3,000, ₹5,000, ₹10,000, ₹20,000 and women's ₹15,000 guides.
- Concise India-specific titles and descriptions for six recommendation articles, with discount and stretch-pick context preserved.
- Curated related reading for all 19 current articles. Automatic fallback ignores generic tags and excludes deal articles.
- Section navigation on longer articles, and contextual links in the ₹20,000 and women's guides.
- Correct section heading hierarchy in older articles while preserving their anchor URLs.
- Build-output checks for internal destinations, section anchors, article headings, recommendations and the hub sitemap entry, run in PR CI.

Existing article URLs and publication dates remain unchanged. Metadata edits do not claim that watch prices or availability were freshly verified.

## Search Console review still required

No authenticated Search Console session was available during implementation. Public search results show some articles, but do not establish full index coverage or keyword performance. The topic ideas below are editorial hypotheses, not measured search demand.

1. Export Performance > Search results for the last three months, filtered to India and Web search. Include Queries and Pages. Compare against the preceding three months, accounting for seasonal sale spikes.
2. Review queries with meaningful impressions and positions roughly 5–20. Match each query to its current landing page before deciding to expand content or write a new article.
3. Review low-click queries individually. Check intent, displayed title and search-result competition before treating low CTR as a title problem.
4. Inspect indexing for the main guides and the new hub. Check excluded URLs and Google's selected canonical. Confirm the submitted sitemap is `https://thewristjournal.com/sitemap-index.xml`.
5. Keep private Search Console exports and analytics outside this public repository.

## Evergreen editorial queue

| Topic hypothesis | Reader question | Existing starting point | Work needed before publishing |
| --- | --- | --- | --- |
| Watches for small wrists in India under ₹15,000 | Which watches fit, rather than merely being labelled small? | Women's guide and compact G-Shock picks | Verify lug-to-lug dimensions, thickness and bracelet fit; distinguish measurements from estimates |
| Automatic vs quartz for a first watch in India | Is an automatic worth the maintenance and compromises? | What makes a good watch; ₹10,000 and ₹20,000 guides | Research service requirements, warranty terms and current model examples |
| Watches for office wear in India under ₹10,000 | What fits under a cuff without looking dull? | Timex and ₹10,000 guides | Verify dimensions and current availability; avoid duplicating the budget list |
| Buying watches on Amazon and Flipkart in India | How should a buyer evaluate sellers, invoices and warranty? | Where to buy watches in India | Verify each brand's current warranty policy and marketplace guidance; avoid blanket seller guarantees |

Use Search Console evidence to choose the first topic. Each article should answer a distinct question and link to the relevant existing guides. Verify current India prices, references, dimensions and seller terms before publication. Preserve the journal's paragraph style, light humour and clear distinction between watches worn and researched picks.

## Measurement after deployment

Record deployment date and the affected URLs. Review after four weeks and again after eight to twelve weeks, using India organic clicks and impressions for evergreen pages, query coverage, and indexed status. Compare sale-period traffic separately. Track organic landing sessions in Analytics alongside Search Console clicks, which measure a different thing.

Continue Reddit promotion when an article is useful to the community. Judge this phase by whether evergreen pages gain discovery between promotions; a PR does not by itself prove an increase in organic traffic.
