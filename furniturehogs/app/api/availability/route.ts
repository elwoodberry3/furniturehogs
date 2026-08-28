import { NextResponse } from "next/server";
import { generateDemoSlots, type Slot } from "@/lib/availability";

// Serverless (Node) route. Runs on Vercel functions — NOT compatible with
// output:'export'. This is the intentional Baseline-Stack wiring point.
export const dynamic = "force-dynamic";

export async function GET() {
  const url = process.env.N8N_AVAILABILITY_URL;

  // LIVE PATH — TODO_HUBSPOT_AVAILABILITY
  if (url) {
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: { "content-type": "application/json" },
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`n8n availability ${res.status}`);
      const slots = (await res.json()) as Slot[];
      return NextResponse.json({ mode: "live", slots });
    } catch (err) {
      // Fail loud in logs, degrade gracefully for the visitor.
      console.error("[availability] n8n fetch failed, using demo:", err);
    }
  }

  // DEMO PATH — zero credentials, fully clickable.
  return NextResponse.json({ mode: "demo", slots: generateDemoSlots() });
}
