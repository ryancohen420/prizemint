// src/app/api/raffles/route.ts

import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/session";
import prisma from "@/lib/prisma";
export async function GET() {
  try {
    const raffles = await prisma.raffle.findMany({
      where: {
        isActive: true, // optional - only show active raffles
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        ticketSupply: true,
        ticketsSold: true,
        priceEth: true,
        endsAt: true,
        isActive: true,
        createdAt: true,
        owner: {
          select: {
            address: true,
          },
        },
      },
    });

    return NextResponse.json(raffles);
  } catch (error) {
    console.error("Error fetching raffles:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const {
    title,
    description,
    imageUrl,
    ticketSupply,
    priceEth,
    endsAt,
  } = await req.json();

  if (!title || !description || !imageUrl || !ticketSupply || !priceEth || !endsAt) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  try {
    const raffle = await prisma.raffle.create({
      data: {
        title,
        description,
        imageUrl,
        ticketSupply,
        priceEth,
        ticketsSold: 0,
        endsAt: new Date(endsAt),
        owner: { connect: { id: session.user.id } },
      },
    });

    return NextResponse.json(raffle);
  } catch (error) {
    console.error("Error creating raffle:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
