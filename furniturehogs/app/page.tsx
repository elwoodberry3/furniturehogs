import { BookingProvider } from "@/components/BookingContext";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Positioning, Steps, TakeDont, Why, FinalCta } from "@/components/Sections";
import { BookingBlock } from "@/components/BookingBlock";
import { Footer } from "@/components/Footer";
import { BUILD } from "@/lib/build.config";

export default function Home() {
  return (
    <BookingProvider>
      <a id="top" />
      <Header />
      <Hero />
      <Positioning />
      <Steps />
      <TakeDont />
      <Why />

      <section id="book" className="bg-gradient-to-b from-navy to-navy-deep py-[84px]">
        <div className="mx-auto max-w-[1120px] px-6">
          <div className="mb-11 text-center">
            <span className="mb-3.5 inline-block text-[0.74rem] font-bold uppercase tracking-eyebrow text-hog-red">Book now</span>
            <h2 className="text-[clamp(1.9rem,3.6vw,2.6rem)] font-extrabold leading-tight tracking-tight">Pick a window. Consider it hauled.</h2>
            <p className="mt-2.5 text-silver">Availability is live from our schedule. Two minutes and you're set.</p>
          </div>
          <BookingBlock />
        </div>
      </section>

      <FinalCta />
      <Footer />
    </BookingProvider>
  );
}
