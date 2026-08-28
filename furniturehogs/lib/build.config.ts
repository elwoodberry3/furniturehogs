// ============================================================================
// IAS BUILD 023 — FURNITURE HOGS
// Config-as-data: this file drives all page content + build governance.
// Re-skinning or adding a build changes config, not components.
// ============================================================================

export type BuildStatus = "live" | "demo" | "todo";

export interface TodoItem {
  key: string;
  label: string;
}

export const BUILD = {
  number: 23,
  name: "furniturehogs",
  displayName: "Furniture Hogs",
  sector: "Home Services — Residential Furniture Removal",
  subdomain: "furniturehogs.iasbootcamp.com",
  repo: "ias-build-023-furniturehogs",
  status: "demo" as BuildStatus,
  tagline: "Residential furniture removal. That's all we do.",
  phone: "(945) 303-8331",
  phoneHref: "tel:+19453038331",
  hours: "Open 7 days · 7 AM–9 PM CT",
  serviceArea: [
    "Denton",
    "Prosper",
    "Frisco",
    "Little Elm",
    "The Colony",
    "Aubrey",
    "Lakewood Village",
  ],
  // Named open gaps rendered on-page as honesty signals (TodoChip).
  todos: [
    { key: "TODO_HUBSPOT_AVAILABILITY", label: "Live availability read/write from HubSpot" },
    { key: "TODO_N8N_BOOKING", label: "Booking POST → n8n → HubSpot upsert + Resend/SMS" },
    { key: "TODO_A2P_VERIFY", label: "A2P 10DLC brand/campaign registration before live SMS" },
  ] satisfies TodoItem[],
} as const;

// ---- Marketing copy (from approved copy.md) -------------------------------
export const CONTENT = {
  hero: {
    eyebrow: "Denton County, TX",
    headlineLines: ["Old furniture", "gone.", "No heavy lifting.", "No hassle."],
    redLineIndex: 1,
    sub:
      "Furniture Hogs is Denton County's furniture removal specialist. Couch, mattress, dresser, dining set — we carry it out, load it up, and haul it away. You don't touch a thing.",
    trust: [
      "Licensed & insured",
      "Serving Denton County",
      "We recycle & donate",
      "Book in 2 minutes",
    ],
  },
  positioning: {
    eyebrow: "One thing. Done better.",
    headline: "We do one thing. We do it better.",
    body:
      "Most junk haulers take everything — and specialize in nothing. We're not that. Furniture Hogs removes residential furniture, period. That focus means the right truck, the right crew, and a fair price every time, without the upsell for a \u201Cmixed load\u201D you never asked for.",
    callout:
      "Got furniture? We're your crew. Got anything else? We'll happily point you to someone who handles it.",
  },
  steps: {
    headline: "Booked in minutes. Gone in days.",
    lead: "Three steps. You lift nothing.",
    items: [
      {
        num: "STEP 01",
        title: "Tell us what you've got",
        body:
          "Book online and snap a photo of your furniture. That's how we size the job and give you a fair, upfront price.",
      },
      {
        num: "STEP 02",
        title: "Pick your window",
        body:
          "Choose a 2-hour arrival window that works for you. We'll text you before we're on the way.",
      },
      {
        num: "STEP 03",
        title: "We haul it away",
        body:
          "Our crew does all the lifting — from the bedroom, the basement, the third floor, wherever it sits. We sweep up and go. You're done.",
      },
    ],
  },
  take: {
    eyebrow: "What we take",
    headline: "If it's furniture, it's ours to haul.",
    items: [
      "Sofas, sectionals & love seats",
      "Mattresses & box springs",
      "Dressers & armoires",
      "Recliners & armchairs",
      "Dining tables & chairs",
      "Desks & office furniture",
      "Bed frames & headboards",
      "Bookshelves & cabinets",
    ],
    underGrid:
      "Not sure if your item counts? If you sit on it, sleep on it, or store clothes in it, we've got you. Add a photo when you book and we'll confirm.",
  },
  dont: {
    headline: "Here's what we'll send you elsewhere for.",
    items: [
      "Appliances (fridges, washers, dryers)",
      "Yard waste & construction debris",
      "Electronics & e-waste",
      "Hazardous materials of any kind",
      "General household junk & full cleanouts",
    ],
    redirect:
      "Need one of those hauled? A full-service junk company is your best bet, and we're glad to point you toward one. But if it's furniture, nobody does it cleaner or faster than Furniture Hogs.",
  },
  why: {
    eyebrow: "Local, focused, and fair",
    headline: "Why Furniture Hogs",
    pillars: [
      {
        icon: "↑",
        title: "You never lift a thing",
        body:
          "Upstairs, out back, down in the basement — our crew carries it all out. Full-service, every time.",
      },
      {
        icon: "$",
        title: "Upfront pricing",
        body:
          "Send a photo, get a price. We quote by truck volume — no surprise fees when we arrive.",
      },
      {
        icon: "♻",
        title: "Out of the landfill",
        body:
          "Gently used pieces get donated. Recyclables get recycled. We only trash what truly can't be saved.",
      },
      {
        icon: "★",
        title: "Denton County born",
        body:
          "We're your neighbors, not a national call center. Local crew, local pride, real accountability.",
      },
    ],
  },
  final: {
    headline: "Ready to get that furniture out of your way?",
    sub: "Book online in about two minutes. Pick your window. Consider it hauled.",
  },
} as const;
