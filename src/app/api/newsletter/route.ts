import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = (await req.json().catch(() => ({}))) as { email?: string };
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return new NextResponse("Nieprawidłowy adres e-mail.", { status: 400 });
  }
  // Tu podłącz dostawcę newslettera (np. Mailchimp, GetResponse, Klaviyo).
  return NextResponse.json({ ok: true });
}
