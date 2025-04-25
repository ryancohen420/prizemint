import { NextResponse } from "next/server";

export async function GET() {
  // This would usually check cookies or session
  return NextResponse.json({ address: null });
}