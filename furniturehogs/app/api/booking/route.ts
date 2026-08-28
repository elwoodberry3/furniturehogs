import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface BookingPayload {
  name: string;
  phone: string;
  email: string;
  address: string;
  items: string;
  quote: { tier: string; lo: number; hi: number; vol: number } | null;
  slot: { date: string; label: string; window: string } | null;
  smsConsent: boolean;
  source: string;
}

export async function POST(req: Request) {
  let body: BookingPayload;
  try {
    body = (await req.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request body." }, { status: 400 });
  }

  // Server-side validation — never trust the client.
  const missing: string[] = [];
  if (!body.name?.trim()) missing.push("name");
  if (!body.phone?.trim()) missing.push("phone");
  if (!body.email?.trim()) missing.push("email");
  if (!body.smsConsent) missing.push("smsConsent");
  if (!body.slot) missing.push("slot");
  if (missing.length) {
    return NextResponse.json(
      { ok: false, error: `Missing required: ${missing.join(", ")}` },
      { status: 422 }
    );
  }

  const url = process.env.N8N_BOOKING_URL;
  const secret = process.env.N8N_WEBHOOK_SECRET;

  // LIVE PATH — TODO_N8N_BOOKING
  // n8n: upsert contact by email (idProperty:email) → write booked window back
  // to HubSpot → trigger Resend confirmation + A2P SMS.
  if (url) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(secret ? { "x-fh-signature": secret } : {}),
        },
        body: JSON.stringify(body),
        cache: "no-store",
      });
      if (!res.ok) throw new Error(`n8n booking ${res.status}`);
      return NextResponse.json({ ok: true, mode: "live" });
    } catch (err) {
      console.error("[booking] n8n post failed:", err);
      return NextResponse.json(
        { ok: false, error: "Booking service unavailable. Call (945) 303-8331." },
        { status: 502 }
      );
    }
  }

  // DEMO PATH — echo back what n8n would have received.
  console.log("[booking] DEMO payload → n8n → HubSpot upsert-by-email:", body);
  return NextResponse.json({ ok: true, mode: "demo", received: body });
}
