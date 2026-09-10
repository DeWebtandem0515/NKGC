import { NextResponse, type NextRequest } from "next/server";
import { contactSchema } from "@/lib/validation/contact-schema";
import { isRateLimited } from "@/lib/rate-limit";
import { EmailNotConfiguredError, sendContactEmail } from "@/lib/email";

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (isRateLimited(`contact:${ip}`)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "invalid_fields" }, { status: 400 });
  }

  // Honeypot: een ingevuld "website"-veld betekent vrijwel zeker een bot.
  // We doen alsof het gelukt is, zonder daadwerkelijk iets te versturen.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true });
  }

  const { website: _honeypot, ...values } = parsed.data;

  try {
    await sendContactEmail(values);
  } catch (error) {
    if (error instanceof EmailNotConfiguredError) {
      console.error("Contact form: e-mailprovider niet geconfigureerd.");
      return NextResponse.json({ error: "not_configured" }, { status: 503 });
    }
    console.error("Contact form: versturen mislukt.");
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
