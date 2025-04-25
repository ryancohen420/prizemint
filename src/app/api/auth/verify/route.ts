import { NextResponse } from "next/server";
import { SiweMessage } from "siwe";

export async function POST(req: Request) {
  const { message, signature } = await req.json();

  try {
    const siwe = new SiweMessage(message);
    const result = await siwe.verify({ signature });

    if (!result.success) {
      return NextResponse.json({ ok: false }, { status: 401 });
    }

    // In a real app you'd persist session here
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json({ ok: false, error }, { status: 400 });
  }
}