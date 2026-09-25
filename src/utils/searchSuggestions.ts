import { Product } from '../types';

export type SuggestionKind = 'product' | 'brand' | 'category';

export interface SearchSuggestion {
  id: string;
  kind: SuggestionKind;
  /** Primary line — a product name, or the brand / category being offered. */
  label: string;
  /** Secondary line — provenance or hit count. */
  meta: string;
  /** The text to push into the search box when this suggestion is chosen. */
  value: string;
  product?: Product;
  score: number;
}

/** Shown before anything is typed, when the field is merely focused. */
const TRENDING_LIMIT = 4;

/** Ceiling for a typed query. */
const MAX_SUGGESTIONS = 8;

/**
 * A suggestion must score at least this share of the best hit in its own group
 * to survive. Without it, one strong match such as "iPhone" drags up every
 * other product that scraped past a weak fuzzy hit, which reads as noise
 * rather than as a suggestion.
 */
const RELATIVE_FLOOR = 0.25;

/** ...and never drop a hit below this outright, so short queries stay useful. */
const ABSOLUTE_FLOOR = 10;

/**
 * Typo tolerance ("aple" -> "apple") only becomes trustworthy once a token is
 * long enough to plausibly be a word, and only against a single word. Matching
 * a long query as a loose character sequence across a whole description
 * produces confident nonsense, so a missed keystroke costs one edit at most.
 */
const MIN_FUZZY_LENGTH = 4;

/** Edits allowed between a token and a candidate word. */
const maxEditsFor = (length: number): number => (length >= 7 ? 2 : 1);

/**
 * How many suggestions a query of this length is allowed to produce.
 *
 * A single keystroke should read as "I'm starting something", not as a wall of
 * 24 results, so the list starts tight and widens by roughly one row per extra
 * character until it tops out.
 *
 *   "" -> 4   "a" -> 4   "ap" -> 5   "app" -> 6   "ipho" -> 7   "iphone x" -> 8
 */
export const suggestionLimit = (query: string): number => {
  const length = query.trim().length;
  if (length === 0) return TRENDING_LIMIT;
  return Math.min(MAX_SUGGESTIONS, length + TRENDING_LIMIT - 1);
};

/** Splits a query into meaningful words, ignoring stray punctuation. */
const tokenize = (query: string): string[] =>
  query
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);

/** True when `a` and `b` differ by at most `max` single-character edits. */
const isWithinEditDistance = (a: string, b: string, max: number): boolean => {
  if (Math.abs(a.length - b.length) > max) return false;

  let previous = Array.from({ length: b.length + 1 }, (_, i) => i);
  let current = new Array<number>(b.length + 1).fill(0);

  for (let i = 1; i <= a.length; i++) {
    current[0] = i;
    let rowMin = current[0];

    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(previous[j] + 1, current[j - 1] + 1, previous[j - 1] + cost);
      if (current[j] < rowMin) rowMin = current[j];
    }

    // No remaining cell can climb back under `max`, so stop early.
    if (rowMin > max) return false;
    [previous, current] = [current, previous];
  }

  return previous[b.length] <= max;
};

/**
 * Weak score when no literal substring matched, but some whole word in `text`
 * is a near-miss of the token.
 *
 * The match must be anchored on the first character. Edit distance alone is
 * too generous at the front of a word: "iphone" is one insertion away from
 * "phone", which would surface "Nothing Phone" as a match for "iphone".
 */
const fuzzyWordScore = (text: string, token: string): number => {
  if (token.length < MIN_FUZZY_LENGTH) return 0;
  const maxEdits = maxEditsFor(token.length);

  for (const word of text.toLowerCase().split(/[^a-z0-9]+/)) {
    if (word[0] !== token[0]) continue;
    if (isWithinEditDistance(token, word, maxEdits)) {
      // A same-length near-miss is a transposition or a single slip, not a
      // genuinely different word, so it ranks slightly higher.
      return word.length === token.length ? 12 : 10;
    }
  }
  return 0;
};

/**
 * Scores one field of text against one token.
 *
 * A hit at the very start of a field, or at the start of a word inside it, is
 * worth far more than a hit buried mid-word — "watch" should float
 * "Apple Watch Series 9" above "Sandwich Toaster".
 */
const fieldScore = (text: string, token: string): number => {
  const hay = text.toLowerCase();
  const index = hay.indexOf(token);

  if (index === -1) return fuzzyWordScore(text, token);

  let score = 30;
  if (index === 0) score += 30;
  else if (hay[index - 1] === ' ' || hay[index - 1] === '-' || hay[index - 1] === '(') {
    score += 20;
  }
  return score;
};

/** Field weights, tuned so a name hit always outranks a category hit. */
const NAME_WEIGHT = 3;
const BRAND_WEIGHT = 2.2;
const CATEGORY_WEIGHT = 1.5;
const SUPER_CATEGORY_WEIGHT = 1.2;

const scoreProduct = (product: Product, tokens: string[]): number => {
  let total = 0;

  for (const token of tokens) {
    const best = Math.max(
      fieldScore(product.name, token) * NAME_WEIGHT,
      fieldScore(product.brand, token) * BRAND_WEIGHT,
      fieldScore(product.category, token) * CATEGORY_WEIGHT,
      fieldScore(product.superCategory, token) * SUPER_CATEGORY_WEIGHT
    );

    // Every token must land somewhere, otherwise "aple iphone" outranks "iphone".
    if (best === 0) return 0;
    total += best;
  }

  if (product.isBestSeller) total += 4;
  if (product.inStock) total += 2;
  if (product.originalPrice) total += 1; // on sale nudges it up for tie-breaks

  return total;
};

/**
 * Relevance of one product for a whole query. Zero means "no match".
 *
 * This is the single definition of "does this product match", shared by the
 * suggestion dropdown and the catalog grid, so a suggestion can never point at
 * a product the grid would then refuse to show.
 */
export const productMatchScore = (product: Product, query: string): number => {
  const tokens = tokenize(query);
  return tokens.length === 0 ? 0 : scoreProduct(product, tokens);
};

/** Whether a product belongs in the results for a query. */
export const matchesQuery = (product: Product, query: string): boolean =>
  productMatchScore(product, query) > 0;

/** How many products the query matches in total, for the "see all" row. */
export const countMatchingProducts = (products: Product[], query: string): number => {
  if (tokenize(query).length === 0) return products.length;
  return products.filter((product) => matchesQuery(product, query)).length;
};

/** Sorts by score, then discards anything far below the group leader. */
const rankAndTrim = <T extends { score: number }>(items: T[]): T[] => {
  const sorted = [...items].sort((a, b) => b.score - a.score);
  if (sorted.length === 0) return sorted;

  const floor = Math.max(sorted[0].score * RELATIVE_FLOOR, ABSOLUTE_FLOOR);
  return sorted.filter((item) => item.score >= floor);
};

/** Penalises term rows so a product always wins a tie against its own brand. */
const TERM_PENALTY = 8;

const productSuggestions = (
  products: Product[],
  query: string,
  limit: number
): SearchSuggestion[] =>
  rankAndTrim(
    products.map((product): SearchSuggestion | null => {
      const score = productMatchScore(product, query);
      if (score === 0) return null;
      return {
        id: `product:${product.id}`,
        kind: 'product',
        label: product.name,
        meta: `${product.brand} • ${product.category} • $${product.price.toLocaleString()}`,
        value: product.name,
        product,
        score,
      };
    }).filter((s): s is SearchSuggestion => s !== null)
  ).slice(0, limit);

const termSuggestions = (
  products: Product[],
  query: string,
  limit: number,
  kind: 'brand' | 'category'
): SearchSuggestion[] => {
  const counts = new Map<string, number>();

  for (const product of products) {
    const value = kind === 'brand' ? product.brand : product.category;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  const tokens = tokenize(query);

  const scored = Array.from(counts.entries())
    .map(([term, count]): SearchSuggestion | null => {
      const perToken = tokens.map((token) => fieldScore(term, token));
      // A term row stands only if every token lands, same rule as products.
      if (perToken.some((score) => score === 0)) return null;

      return {
        id: `${kind}:${term}`,
        kind,
        label: term,
        meta: `${count} ${count === 1 ? 'product' : 'products'}`,
        value: term,
        score: perToken.reduce((total, score) => total + score, 0) - TERM_PENALTY,
      };
    })
    .filter((s): s is SearchSuggestion => s !== null);

  return rankAndTrim(scored).slice(0, limit);
};

/** Best sellers stand in for "trending" until the shopper types something. */
const trendingSuggestions = (products: Product[], limit: number): SearchSuggestion[] =>
  [...products]
    .sort((a, b) => b.rating - a.rating || b.reviewsCount - a.reviewsCount)
    .slice(0, limit)
    .map(
      (product): SearchSuggestion => ({
        id: `trending:${product.id}`,
        kind: 'product',
        label: product.name,
        meta: `${product.brand} • ${product.category} • $${product.price.toLocaleString()}`,
        value: product.name,
        product,
        score: 0,
      })
    );

/**
 * The ranked dropdown for a given query.
 *
 * An empty query yields trending products. A typed query yields the best
 * scoring mix of products, brands and categories, each group held to its own
 * relevance floor so brand and category rows are not buried by the products
 * that contain them, and term rows nudged behind comparable products.
 */
export const getSearchSuggestions = (
  products: Product[],
  query: string,
  limit = suggestionLimit(query)
): SearchSuggestion[] => {
  if (tokenize(query).length === 0) {
    return trendingSuggestions(products, limit);
  }

  // Terms get a small pool so a broad query ("a") does not push a ten-brand
  // list into a four-row dropdown.
  const termPool = Math.max(2, Math.ceil(limit / 2));

  return [
    ...productSuggestions(products, query, limit),
    ...termSuggestions(products, query, termPool, 'brand'),
    ...termSuggestions(products, query, termPool, 'category'),
  ]
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
};

/**
 * Splits `text` so matched characters can be emphasised.
 *
 * Matching runs against the lowercased original so the returned indices line up
 * with the real string; a fuzzy-only hit simply yields no highlight.
 */
export const splitHighlight = (
  text: string,
  query: string
): { text: string; match: boolean }[] => {
  const tokens = tokenize(query);
  if (tokens.length === 0) return [{ text, match: false }];

  const hay = text.toLowerCase();
  const marks = new Array<boolean>(text.length).fill(false);

  for (const token of tokens) {
    let from = 0;
    for (;;) {
      const index = hay.indexOf(token, from);
      if (index === -1) break;
      for (let i = index; i < index + token.length; i++) marks[i] = true;
      from = index + token.length;
    }
  }

  const parts: { text: string; match: boolean }[] = [];
  let buffer = '';
  let bufferMatch = marks[0] ?? false;

  for (let i = 0; i < text.length; i++) {
    if (marks[i] !== bufferMatch) {
      if (buffer) parts.push({ text: buffer, match: bufferMatch });
      buffer = '';
      bufferMatch = marks[i];
    }
    buffer += text[i];
  }
  if (buffer) parts.push({ text: buffer, match: bufferMatch });

  return parts;
};
