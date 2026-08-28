// ============================================================================
// DETERMINISTIC VOLUME QUOTE ENGINE — no LLM in the pricing path.
// "Demonstrate, never claim." Retune by editing CATALOG + TIERS only.
// NOTE: volume weights and $ ranges are placeholders — replace with Furniture
// Hogs' real operating numbers before production.
// ============================================================================

export interface CatalogItem {
  id: string;
  name: string;
  vol: number; // "truck units"; a full truck = 100
}

export interface Tier {
  max: number;
  label: string;
  lo: number;
  hi: number;
}

export const CATALOG: CatalogItem[] = [
  { id: "sofa", name: "Sofa / sectional", vol: 22 },
  { id: "mattress", name: "Mattress + box spring", vol: 14 },
  { id: "dresser", name: "Dresser / armoire", vol: 12 },
  { id: "recliner", name: "Recliner / armchair", vol: 10 },
  { id: "dining", name: "Dining set (table+4)", vol: 20 },
  { id: "desk", name: "Desk / office piece", vol: 11 },
  { id: "bed", name: "Bed frame + headboard", vol: 9 },
  { id: "shelf", name: "Bookshelf / cabinet", vol: 8 },
];

export const TIERS: Tier[] = [
  { max: 12, label: "Minimum load", lo: 89, hi: 129 },
  { max: 25, label: "1/8 truck", lo: 129, hi: 179 },
  { max: 40, label: "1/4 truck", lo: 179, hi: 259 },
  { max: 60, label: "1/2 truck", lo: 259, hi: 379 },
  { max: 80, label: "3/4 truck", lo: 379, hi: 499 },
  { max: 999, label: "Full truck", lo: 499, hi: 649 },
];

export type Counts = Record<string, number>;

export function emptyCounts(): Counts {
  return CATALOG.reduce((acc, c) => ((acc[c.id] = 0), acc), {} as Counts);
}

export function totalVolume(counts: Counts): number {
  return CATALOG.reduce((sum, c) => sum + c.vol * (counts[c.id] || 0), 0);
}

export function tierFor(vol: number): Tier {
  return TIERS.find((t) => vol <= t.max) ?? TIERS[TIERS.length - 1];
}

export function fillPercent(vol: number): number {
  return Math.min(100, Math.round(vol));
}

export interface Quote {
  vol: number;
  pct: number;
  tier: Tier;
  hasItems: boolean;
}

export function computeQuote(counts: Counts): Quote {
  const vol = totalVolume(counts);
  return { vol, pct: fillPercent(vol), tier: tierFor(vol), hasItems: vol > 0 };
}
