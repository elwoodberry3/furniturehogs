import { CONTENT } from "@/lib/build.config";
import { Button } from "@/components/Button";

const eyebrow = "mb-3.5 inline-block text-[0.74rem] font-bold uppercase tracking-eyebrow text-hog-red";

export function Positioning() {
  const c = CONTENT.positioning;
  return (
    <section className="bg-navy py-[84px]">
      <div className="mx-auto max-w-[820px] px-6 text-center">
        <span className={eyebrow}>{c.eyebrow}</span>
        <h2 className="text-[clamp(2rem,4vw,2.9rem)] font-extrabold leading-tight tracking-tight">{c.headline}</h2>
        <p className="mx-auto mt-5 max-w-[56ch] text-[1.12rem] text-silver">{c.body}</p>
        <div className="mx-auto mt-7 max-w-[60ch] rounded-r-brand border-l-4 border-hog-red bg-hog-red/[.06] px-5 py-3.5 text-left text-[1.12rem] font-bold text-white">
          {c.callout}
        </div>
      </div>
    </section>
  );
}

export function Steps() {
  const c = CONTENT.steps;
  return (
    <section id="how" className="py-[84px]">
      <div className="mx-auto max-w-[1120px] px-6">
        <h2 className="text-center text-[clamp(1.9rem,3.6vw,2.6rem)] font-extrabold leading-tight tracking-tight">{c.headline}</h2>
        <p className="mb-12 mt-2 text-center text-silver">{c.lead}</p>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {c.items.map((s) => (
            <div key={s.num} className="rounded-xl border border-silver/16 bg-gradient-to-b from-panel to-panel-alt p-6">
              <span className="mb-3 block text-[0.8rem] font-extrabold tracking-widest text-hog-red">{s.num}</span>
              <h3 className="mb-2 text-[1.2rem] font-extrabold">{s.title}</h3>
              <p className="text-[0.96rem] text-silver">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-9 text-center"><Button href="#book">Start My Booking</Button></div>
      </div>
    </section>
  );
}

export function TakeDont() {
  const t = CONTENT.take;
  const d = CONTENT.dont;
  return (
    <section id="take" className="bg-navy py-[84px]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-start gap-9 px-6 md:grid-cols-[1.3fr_1fr]">
        <div>
          <span className={eyebrow}>{t.eyebrow}</span>
          <h2 className="mb-4 text-[clamp(1.8rem,3.4vw,2.4rem)] font-extrabold leading-tight tracking-tight">{t.headline}</h2>
          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {t.items.map((i) => (
              <div key={i} className="flex items-center gap-2.5 rounded-brand border border-silver/16 bg-white/[.03] px-3.5 py-3 text-[0.95rem] font-medium">
                <span className="font-extrabold text-oak">✓</span>{i}
              </div>
            ))}
          </div>
          <p className="mt-4 text-[0.95rem] text-silver">{t.underGrid}</p>
        </div>
        <div className="rounded-xl border border-silver/16 bg-white/[.02] p-6">
          <h3 className="mb-3.5 text-[1.15rem] font-extrabold">{d.headline}</h3>
          <ul className="flex flex-col gap-2.5">
            {d.items.map((i) => (
              <li key={i} className="flex items-start gap-2.5 text-[0.94rem] text-silver">
                <span className="font-extrabold text-hog-grey">✕</span>{i}
              </li>
            ))}
          </ul>
          <p className="mt-4 border-t border-silver/16 pt-3.5 text-[0.9rem] text-silver">{d.redirect}</p>
        </div>
      </div>
    </section>
  );
}

export function Why() {
  const c = CONTENT.why;
  return (
    <section className="py-[84px]">
      <div className="mx-auto max-w-[1120px] px-6">
        <span className={`${eyebrow} block text-center`}>{c.eyebrow}</span>
        <h2 className="mb-11 text-center text-[clamp(1.9rem,3.6vw,2.5rem)] font-extrabold leading-tight tracking-tight">{c.headline}</h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {c.pillars.map((p) => (
            <div key={p.title} className="p-1.5">
              <div className="mb-3.5 grid h-11 w-11 place-items-center rounded-brand border border-hog-red/30 bg-hog-red/12 text-hog-red">{p.icon}</div>
              <h3 className="mb-1.5 text-[1.08rem] font-extrabold">{p.title}</h3>
              <p className="text-[0.92rem] text-silver">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCta() {
  const c = CONTENT.final;
  return (
    <section className="bg-hog-red py-[84px] text-center">
      <div className="mx-auto max-w-[1120px] px-6">
        <h2 className="text-[clamp(2rem,4vw,2.8rem)] font-extrabold leading-tight text-white">{c.headline}</h2>
        <p className="mx-auto mb-7 mt-3.5 max-w-[44ch] text-[1.1rem] text-white/90">{c.sub}</p>
        <Button href="#book" variant="light">Book Your Pickup</Button>
      </div>
    </section>
  );
}
