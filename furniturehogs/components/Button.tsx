import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "light" | "ghost";
const V: Record<Variant, string> = {
  primary: "bg-hog-red text-white hover:shadow-[0_10px_26px_-8px_rgba(227,33,40,.7)]",
  light: "bg-white text-sienna hover:shadow-[0_10px_26px_-10px_rgba(0,0,0,.5)]",
  ghost: "bg-transparent text-white border-[1.5px] border-silver/30 hover:border-silver",
};
const base =
  "inline-flex items-center justify-center gap-2.5 rounded-brand px-6 py-3.5 text-base font-bold uppercase tracking-wide transition active:translate-y-px focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-oak";

export function Button({
  children, href, variant = "primary", onClick, full, type = "button",
}: {
  children: ReactNode; href?: string; variant?: Variant;
  onClick?: () => void; full?: boolean; type?: "button" | "submit";
}) {
  const cls = `${base} ${V[variant]} ${full ? "w-full" : ""}`;
  if (href) return <Link href={href} className={cls}>{children}</Link>;
  return <button type={type} onClick={onClick} className={cls}>{children}</button>;
}
