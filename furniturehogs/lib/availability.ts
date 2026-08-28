// ============================================================================
// AVAILABILITY — HubSpot owns the truth; n8n reads booked windows and returns
// open 2-hour slots. This module holds the shared contract + demo generator.
//
// TODO_HUBSPOT_AVAILABILITY: /api/availability proxies to N8N_AVAILABILITY_URL.
// n8n workflow: read booked-window records from HubSpot → diff against the
// WINDOWS grid → return open slots in the Slot[] shape below.
// ============================================================================

export const WINDOWS = [
  "7–9 AM",
  "9–11 AM",
  "11 AM–1 PM",
  "1–3 PM",
  "3–5 PM",
  "5–7 PM",
  "7–9 PM",
] as const;

export interface Slot {
  date: string; // ISO yyyy-mm-dd
  label: string; // e.g. "Fri, Aug 29"
  window: string; // e.g. "9–11 AM"
  open: boolean;
}

// Demo generator — deterministic-ish, honors one-truck reality (some full).
// Runs with zero credentials so the app is fully clickable out of the box.
export function generateDemoSlots(now: Date = new Date()): Slot[] {
  const out: Slot[] = [];
  for (let d = 0; d < 5; d++) {
    const day = new Date(now);
    day.setDate(now.getDate() + d);
    const label = day.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
    const picks = [
      WINDOWS[(d * 2) % WINDOWS.length],
      WINDOWS[(d * 2 + 3) % WINDOWS.length],
    ];
    picks.forEach((w, i) => {
      out.push({
        date: day.toISOString().slice(0, 10),
        label,
        window: w,
        open: !(d === 0 && i === 0), // first window today = full (one-truck realism)
      });
    });
  }
  return out;
}

export function firstOpen(slots: Slot[]): Slot | undefined {
  return slots.find((s) => s.open);
}
