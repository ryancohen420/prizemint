import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/session";
import prisma from "@/lib/prisma";

export async function GET() {
    const session = await getServerSession(authOptions);
  
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  
    try {
      const raffles = await prisma.raffle.findMany({
        where: {
          ownerId: session.user.id,
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
  