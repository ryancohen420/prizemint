// src/app/api/auth/siwe/route.ts
import { NextRequest, NextResponse } from "next/server";
import { SiweMessage } from "siwe";
import { ironOptions, session } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { message, signature } = body;

  try {
    const siwe = new SiweMessage(message);
    const fields = await siwe.verify({ signature });

    if (fields.data.nonce !== message.nonce) {
      return NextResponse.json({ ok: false, error: "Invalid nonce" }, { status: 400 });
    }

    const address = fields.data.address.toLowerCase();

    // Find or create user
    const user = await prisma.user.upsert({
      where: { walletAddress: address },
      update: { lastLogin: new Date() },
      create: { walletAddress: address },
    });

    const res = NextResponse.json({ ok: true });
    await session.save(res, ironOptions, { user });

    return res;
  } catch (e) {
    return NextResponse.json({ ok: false, error: "Signature invalid" }, { status: 400 });
  }
};