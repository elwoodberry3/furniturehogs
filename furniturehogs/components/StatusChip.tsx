import type { BuildStatus } from "@/lib/build.config";

// Single source of truth for build status display.
const MAP: Record<BuildStatus, { text: string; cls: string }> = {
  live: { text: "Live", cls: "text-hog-red bg-hog-red/12 border-hog-red/35" },
  demo: { text: "Demo mode", cls: "text-oak bg-oak/10 border-oak/30" },
  todo: { text: "In progress", cls: "text-silver bg-white/5 border-white/15" },
};

export function StatusChip({ status }: { status: BuildStatus }) {
  const s = MAP[status];
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-[0.7rem] font-bold uppercase tracking-wider ${s.cls}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {s.text}
    </span>
  );
}
