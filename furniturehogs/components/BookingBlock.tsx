"use client";

import { useEffect, useState } from "react";
import { firstOpen, type Slot } from "@/lib/availability";
import { CATALOG, computeQuote } from "@/lib/quote";
import { useBooking } from "@/components/BookingContext";
import { Button } from "@/components/Button";
import { TodoChip } from "@/components/TodoChip";
import { BUILD } from "@/lib/build.config";

export function BookingBlock() {
  const { counts, slot, setSlot } = useBooking();
  const [slots, setSlots] = useState<Slot[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", items: "" });
  const [consent, setConsent] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const q = computeQuote(counts);

  useEffect(() => {
    fetch("/api/availability")
      .then((r) => r.json())
      .then((d: { slots: Slot[] }) => {
        setSlots(d.slots);
        const fo = firstOpen(d.slots);
        if (fo && !slot) setSlot(fo);
      })
      .catch(() => setSlots([]))
      .finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Prefill items textarea from the quote once, if user hasn't typed.
  useEffect(() => {
    if (form.items) return;
    const picked = CATALOG.filter((c) => (counts[c.id] || 0) > 0).map((c) => `${counts[c.id]}× ${c.name}`);
    if (picked.length) setForm((f) => ({ ...f, items: picked.join(", ") }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [counts]);

  const next = firstOpen(slots);

  async function submit() {
    if (!form.name || !form.phone || !form.email) {
      setMsg("Add your name, phone, and email so we can send your price and confirmation.");
      return;
    }
    if (!consent) { setMsg("Please check the consent box so we can text your quote and arrival updates."); return; }
    if (!slot) { setMsg("Pick an available window first."); return; }

    setSubmitting(true);
    setMsg(null);
    const payload = {
      ...form,
      quote: q.hasItems ? { tier: q.tier.label, lo: q.tier.lo, hi: q.tier.hi, vol: q.vol } : null,
      slot,
      smsConsent: consent,
      source: `${BUILD.subdomain}/book`,
    };
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong.");
      setMsg(`Booking received${data.mode === "demo" ? " (demo mode)" : ""} — ${slot.label} · ${slot.window}. Check your phone for confirmation.`);
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Booking service unavailable. Call (945) 303-8331.");
    } finally {
      setSubmitting(false);
    }
  }

  const inputCls =
    "w-full rounded-brand border border-silver/30 bg-white/[.04] px-3.5 py-3 text-[0.98rem] text-white placeholder:text-silver/60 focus:border-hog-red focus:outline-none";
  const labelCls = "mb-1.5 block text-[0.82rem] font-semibold tracking-wide text-silver";

  return (
    <div className="grid grid-cols-1 gap-9 md:grid-cols-[1fr_1.1fr]">
      {/* AVAILABILITY */}
      <div className="rounded-xl border border-silver/30 bg-gradient-to-b from-panel to-panel-alt p-6 shadow-card">
        <h3 className="text-[1.3rem] font-extrabold">Next available</h3>
        <p className="mb-4 mt-1 text-[0.92rem] text-silver">
          Serving {BUILD.serviceArea.join(" · ")}{" "}
          <TodoChip label="TODO_HUBSPOT_AVAILABILITY" />
        </p>

        <div className="mb-4 rounded-brand border border-hog-red/35 bg-hog-red/[.08] px-4 py-4">
          {loading ? (
            <div className="text-sm text-silver">Checking the schedule…</div>
          ) : next ? (
            <>
              <div className="text-[0.72rem] font-bold uppercase tracking-widest text-hog-red">Next available window</div>
              <div className="mt-1 text-[1.35rem] font-extrabold">{next.label} · {next.window}</div>
              <div className="mt-1 text-[0.82rem] text-silver">Book before noon and same-day may be available, depending on the day.</div>
            </>
          ) : (
            <>
              <div className="text-[0.72rem] font-bold uppercase tracking-widest text-hog-red">No open windows in the next 5 days</div>
              <div className="mt-1 text-[0.82rem] text-silver">Call or text {BUILD.phone} and we'll find you a spot.</div>
            </>
          )}
        </div>

        <div className="flex flex-col gap-2">
          {slots.map((s, i) => {
            const selected = slot && s.date === slot.date && s.window === slot.window;
            return (
              <button
                key={`${s.date}-${s.window}-${i}`}
                disabled={!s.open}
                onClick={() => s.open && setSlot(s)}
                className={`flex items-center justify-between gap-3 rounded-brand border px-3.5 py-3 text-left transition ${
                  !s.open
                    ? "cursor-not-allowed border-silver/16 bg-white/[.02] opacity-40"
                    : selected
                    ? "border-hog-red bg-hog-red/10"
                    : "border-silver/16 bg-white/[.03] hover:border-silver"
                }`}
              >
                <div>
                  <div className="text-[0.95rem] font-semibold">{s.label}</div>
                  <div className="text-[0.88rem] text-silver">{s.window}</div>
                </div>
                <div className={`text-[0.7rem] font-bold uppercase tracking-wider ${s.open ? "text-oak" : "text-hog-grey"}`}>
                  {s.open ? "Open" : "Full"}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* FORM */}
      <div className="rounded-xl border border-silver/30 bg-gradient-to-b from-panel to-panel-alt p-6 shadow-card">
        <h3 className="text-[1.3rem] font-extrabold">Book your pickup</h3>
        <p className="mb-4 mt-1 text-[0.92rem] text-silver">No charge to book. You'll see your upfront price before anything's final.</p>

        {(q.hasItems || slot) && (
          <div className="mb-4 rounded-brand border border-oak/30 bg-oak/[.08] px-3.5 py-3 text-[0.9rem]">
            {q.hasItems && <span><b className="text-oak">Est. {q.tier.label}:</b> ${q.tier.lo}–${q.tier.hi}</span>}
            {q.hasItems && slot && <span className="text-silver"> &nbsp;·&nbsp; </span>}
            {slot && <span><b className="text-oak">Window:</b> {slot.label} · {slot.window}</span>}
            <span className="text-silver"> — confirmed from your photos</span>
          </div>
        )}

        <div className="mb-3.5">
          <label className={labelCls} htmlFor="items">Your furniture — what are we hauling?</label>
          <textarea id="items" className={`${inputCls} min-h-[70px] resize-y`}
            placeholder="e.g. 1 sectional sofa, 1 queen mattress + box spring, 2 nightstands"
            value={form.items} onChange={(e) => setForm({ ...form, items: e.target.value })} />
        </div>
        <div className="mb-3.5">
          <label className={labelCls} htmlFor="photo">Add a photo or two (group shots help us price accurately)</label>
          <input id="photo" type="file" accept="image/*" multiple className={inputCls} />
        </div>
        <div className="mb-3.5">
          <label className={labelCls} htmlFor="addr">Address &amp; access notes</label>
          <input id="addr" type="text" className={inputCls}
            placeholder="Street address — floor, stairs/elevator, gate code"
            value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="mb-3.5">
            <label className={labelCls} htmlFor="name">Name</label>
            <input id="name" type="text" className={inputCls} placeholder="Full name"
              value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          </div>
          <div className="mb-3.5">
            <label className={labelCls} htmlFor="phone">Phone</label>
            <input id="phone" type="tel" className={inputCls} placeholder="(945) 555-0100"
              value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
        </div>
        <div className="mb-3.5">
          <label className={labelCls} htmlFor="email">Email</label>
          <input id="email" type="email" className={inputCls} placeholder="you@email.com"
            value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
        </div>

        <label className="mb-4 flex items-start gap-2.5 text-[0.78rem] text-silver">
          <input type="checkbox" className="mt-0.5 flex-none" checked={consent} onChange={(e) => setConsent(e.target.checked)} />
          <span>Text me my quote, confirmation, and arrival updates at this number. Message &amp; data rates may apply. Message frequency varies. Reply STOP to opt out, HELP for help. See SMS Terms &amp; Privacy Policy.</span>
        </label>

        <Button full type="button" onClick={submit}>{submitting ? "Sending…" : "Get My Price & Book"}</Button>

        {msg && <p className="mt-3 text-center text-[0.85rem] text-oak">{msg}</p>}
        <p className="mt-3 text-center text-[0.78rem] text-silver">
          Prefer to talk it through? Call or text{" "}
          <a href={BUILD.phoneHref} className="font-bold text-white">{BUILD.phone}</a>.
        </p>
      </div>
    </div>
  );
}
