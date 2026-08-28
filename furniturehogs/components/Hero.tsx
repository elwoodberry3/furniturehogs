import { CONTENT } from "@/lib/build.config";
import { Button } from "@/components/Button";
import { QuoteCard } from "@/components/QuoteCard";

export function Hero() {
  const c = CONTENT.hero;
  return (
    <section className="relative overflow-hidden border-b border-silver/16 bg-[radial-gradient(1100px_520px_at_78%_-8%,rgba(227,33,40,.16),transparent_60%),linear-gradient(180deg,#0A2440_0%,#061A30_100%)]">
      <div className="mx-auto grid max-w-[1120px] grid-cols-1 items-center gap-13 px-6 py-[74px] md:grid-cols-[1.05fr_.95fr] md:gap-13">
        <div>
          <span className="mb-3.5 inline-block text-[0.74rem] font-bold uppercase tracking-eyebrow text-hog-red">{c.eyebrow}</span>
          <h1 className="text-[clamp(2.5rem,5.4vw,4.1rem)] font-extrabold leading-[1.05] tracking-tight">
            {c.headlineLines.map((line, i) => (
              <span key={i} className="block">
                <span className={i === c.redLineIndex ? "text-hog-red" : ""}>{line}</span>
              </span>
            ))}
          </h1>
          <p className="my-6 max-w-[33ch] text-[1.17rem] text-silver">{c.sub}</p>
          <div className="flex flex-wrap gap-3.5">
            <Button href="#book">Book Your Pickup</Button>
            <Button href="#take" variant="ghost">See What We Take</Button>
          </div>
          <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-[0.86rem] text-silver">
            {c.trust.map((t) => (
              <span key={t} className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-oak" />{t}</span>
            ))}
          </div>
        </div>
        <QuoteCard />
      </div>
    </section>
  );
}
