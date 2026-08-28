"use client";

import { createContext, useContext, useState, type ReactNode, type Dispatch, type SetStateAction } from "react";
import { emptyCounts, type Counts } from "@/lib/quote";
import type { Slot } from "@/lib/availability";

interface BookingState {
  counts: Counts;
  setCounts: Dispatch<SetStateAction<Counts>>;
  slot: Slot | null;
  setSlot: Dispatch<SetStateAction<Slot | null>>;
}

const Ctx = createContext<BookingState | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [counts, setCounts] = useState<Counts>(emptyCounts());
  const [slot, setSlot] = useState<Slot | null>(null);
  return <Ctx.Provider value={{ counts, setCounts, slot, setSlot }}>{children}</Ctx.Provider>;
}

export function useBooking(): BookingState {
  const v = useContext(Ctx);
  if (!v) throw new Error("useBooking must be used within BookingProvider");
  return v;
}
