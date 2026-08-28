import Link from "next/link";
import { BUILD } from "@/lib/build.config";
import { Button } from "@/components/Button";
import { HogMark } from "@/components/HogMark";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-silver/16 bg-navy-deep/[.86] backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1120px] items-center gap-6 px-6">
        <Link href="#top" className="flex items-center gap-2.5 text-[1.15rem] font-extrabold tracking-tight" aria-label="Furniture Hogs home">
          <HogMark className="h-[34px] w-[34px] flex-none" />
          <span>Furniture<span className="text-hog-red">Hogs</span></span>
        </Link>
        <nav className="ml-auto hidden gap-6 text-[0.95rem] font-medium md:flex">
          <Link href="#how" className="text-silver transition hover:text-white">How It Works</Link>
          <Link href="#take" className="text-silver transition hover:text-white">What We Take</Link>
          <Link href="#area" className="text-silver transition hover:text-white">Service Area</Link>
          <Link href="#book" className="text-silver transition hover:text-white">Book Now</Link>
        </nav>
        <div className="ml-auto flex items-center gap-3 md:ml-0">
          <a href={BUILD.phoneHref} className="hidden whitespace-nowrap text-[0.95rem] font-bold text-white md:inline">{BUILD.phone}</a>
          <Button href="#book">Book Online</Button>
        </div>
      </div>
    </header>
  );
}
