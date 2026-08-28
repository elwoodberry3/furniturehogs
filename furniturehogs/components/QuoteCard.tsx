"use client";

import { CATALOG, computeQuote, emptyCounts, type Counts } from "@/lib/quote";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/Button";

// SIGNATURE ELEMENT: the volume quote fills a truck bed as pieces are added.
// Makes "we price by volume" literal instead of abstract.
export function QuoteCard() {
  const { counts, setCounts } = useBooking();
  const q = computeQuote(counts);

  const step = (id: string, d: number) =>
    setCounts((prev: Counts) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + d) }));

  const bedH = Math.round((q.pct / 100) * 76); // 76px bed height
  const bedY = 108 - bedH;

  return (
    <div className="rounded-xl border border-silver/30 bg-gradient-to-b from-panel to-panel-alt p-6 shadow-card">
      <div className="mb-1.5 flex items-center justify-between">
        <h3 className="text-lg font-extrabold">Estimate your price</h3>
        <span className="inline-flex items-center gap-2 rounded-full border border-hog-red/35 bg-hog-red/12 px-2.5 py-1 text-[0.72rem] font-bold uppercase tracking-widest text-hog-red">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-hog-red" />
          Live
        </span>
      </div>
      <p className="mb-4 text-sm text-silver">
        We price by volume — how much room your furniture takes in the truck. Tap to add pieces.
      </p>

      {/* Truck gauge */}
      <div className="relative mb-4">
        <div className="absolute left-3 top-2.5 text-[0.72rem] font-bold uppercase tracking-widest text-silver">
          Truck fill
        </div>
        <svg viewBox="0 0 400 150" className="block w-full" aria-hidden="true">
          <rect x="8" y="30" width="300" height="80" rx="6" fill="none" stroke="#BABABA" strokeOpacity=".35" strokeWidth="2" />
          <clipPath id="bedClip"><rect x="10" y="32" width="296" height="76" rx="5" /></clipPath>
          <g clipPath="url(#bedClip)">
            <rect x="10" y={bedY} width="296" height={bedH} fill="#E32128" opacity=".85"
              style={{ transition: "y .35s ease, height .35s ease" }} />
          </g>
          <path d="M308 60 h30 l20 24 v26 h-50 z" fill="none" stroke="#BABABA" strokeOpacity=".35" strokeWidth="2" />
          <rect x="316" y="66" width="20" height="16" rx="2" fill="#BABABA" fillOpacity=".18" />
          <circle cx="70" cy="120" r="12" fill="#1A1A1A" stroke="#BABABA" strokeOpacity=".4" strokeWidth="2" />
          <circle cx="250" cy="120" r="12" fill="#1A1A1A" stroke="#BABABA" strokeOpacity=".4" strokeWidth="2" />
          <circle cx="330" cy="120" r="12" fill="#1A1A1A" stroke="#BABABA" strokeOpacity=".4" strokeWidth="2" />
        </svg>
      </div>

      {/* Items */}
      <div className="mb-4 flex flex-col gap-2.5">
        {CATALOG.map((c) => (
          <div key={c.id} className="grid grid-cols-[1fr_auto_auto] items-center gap-3 rounded-brand border border-silver/16 bg-white/[.03] px-3 py-2.5">
            <div>
              <div className="text-[0.95rem] font-medium">{c.name}</div>
              <div className="text-xs text-silver">{c.vol} truck units each</div>
            </div>
            <div className="text-xs text-silver">{counts[c.id] > 0 ? `${counts[c.id]} added` : ""}</div>
            <div className="flex items-center overflow-hidden rounded-brand border border-silver/30">
              <button aria-label={`Remove one ${c.name}`} onClick={() => step(c.id, -1)}
                className="h-[30px] w-[30px] bg-white/5 text-lg leading-none text-white hover:bg-hog-red">−</button>
              <span className="w-[34px] text-center text-[0.95rem] font-bold">{counts[c.id] || 0}</span>
              <button aria-label={`Add one ${c.name}`} onClick={() => step(c.id, 1)}
                className="h-[30px] w-[30px] bg-white/5 text-lg leading-none text-white hover:bg-hog-red">+</button>
            </div>
          </div>
        ))}
      </div>

      {/* Output */}
      <div className="mt-1.5 flex items-baseline justify-between gap-2.5 border-t border-silver/30 pt-4">
        <div>
          <div className="text-[0.8rem] font-bold uppercase tracking-widest text-oak">
            {q.hasItems ? q.tier.label : "Add a piece to start"}
          </div>
          <div className="mt-1 text-xs text-silver">{q.pct}% of a truck</div>
        </div>
        <div className="text-[2.1rem] font-extrabold tracking-tight">
          {q.hasItems ? (
            <>${q.tier.lo} <small className="text-[0.9rem] font-medium text-silver">– ${q.tier.hi}</small></>
          ) : (
            <>$0 <small className="text-[0.9rem] font-medium text-silver">–</small></>
          )}
        </div>
      </div>
      <p className="mt-1.5 text-xs text-silver">
        Upfront range shown before you commit. Final price confirmed from your photos — no surprises when we arrive.
      </p>
      <div className="mt-4">
        <Button href="#book" full>Lock this in &amp; pick a window</Button>
      </div>
    </div>
  );
}
