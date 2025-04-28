import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const raffles = await prisma.raffle.findMany({
      where: { isActive: true }, // Only show active raffles
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        ticketSupply: true,
        ticketsSold: true,
        priceEth: true,
        isActive: true,
        createdAt: true,
        endsAt: true,
        owner: {
          select: { address: true },
        },
      },
      orderBy: { createdAt: "desc" }, // Optional: show newest raffles first
    });

    return NextResponse.json(raffles);
  } catch (error) {
    console.error("Error fetching raffles:", error);
    return NextResponse.json({ error: "Failed to load raffles" }, { status: 500 });
  }
}
