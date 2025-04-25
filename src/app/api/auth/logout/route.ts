import { NextResponse } from "next/server";

export async function POST() {
  // Clear auth session (stub for now)
  return NextResponse.json({ ok: true });
}