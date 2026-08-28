import Link from "next/link";
import { BUILD } from "@/lib/build.config";

export function Footer() {
  return (
    <footer className="border-t border-silver/16 bg-navy-deep text-[0.9rem] text-silver">
      <div className="mx-auto max-w-[1120px] px-6 py-11">
        <div className="mb-6 flex flex-wrap justify-between gap-6">
          <div className="max-w-[38ch]">
            <div className="mb-2.5 text-[1.15rem] font-extrabold text-white">Furniture<span className="text-hog-red">Hogs</span></div>
            <p>Residential furniture removal. That's all we do. Serving Denton County, TX. Licensed &amp; insured. We recycle and donate what we can.</p>
          </div>
          <div className="flex flex-wrap gap-14">
            <div>
              <h4 className="mb-3 text-[0.8rem] font-bold uppercase tracking-widest text-white">Company</h4>
              <Link href="#how" className="mb-2 block hover:text-white">How It Works</Link>
              <Link href="#take" className="mb-2 block hover:text-white">What We Take</Link>
              <Link href="#area" className="mb-2 block hover:text-white">Service Area</Link>
              <Link href="#book" className="mb-2 block hover:text-white">Book Now</Link>
            </div>
            <div id="area">
              <h4 className="mb-3 text-[0.8rem] font-bold uppercase tracking-widest text-white">Service Area</h4>
              {BUILD.serviceArea.map((c) => (
                <Link key={c} href="#book" className="mb-2 block hover:text-white">{c}</Link>
              ))}
            </div>
            <div>
              <h4 className="mb-3 text-[0.8rem] font-bold uppercase tracking-widest text-white">Contact</h4>
              <a href={BUILD.phoneHref} className="mb-2 block hover:text-white">{BUILD.phone}</a>
              <Link href="#book" className="mb-2 block hover:text-white">Book Online</Link>
              <span className="block">{BUILD.hours}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap justify-between gap-4 border-t border-silver/16 pt-4 text-[0.82rem]">
          <span>© Furniture Hogs · Denton County, TX</span>
          <span>Privacy Policy · Terms · SMS Terms</span>
        </div>
      </div>
    </footer>
  );
}
