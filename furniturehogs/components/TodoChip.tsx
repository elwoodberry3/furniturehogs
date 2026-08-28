// Honesty signal — renders a named open gap on-page. Never Kinetic Emerald.
export function TodoChip({ label, title }: { label: string; title?: string }) {
  return (
    <span
      title={title ?? "Live wiring pending"}
      className="inline-flex items-center gap-1.5 rounded-full bg-hog-red/90 px-2.5 py-1 text-[0.62rem] font-bold uppercase tracking-wider text-white align-middle"
    >
      <span className="text-[0.6em]">●</span>
      {label}
    </span>
  );
}
