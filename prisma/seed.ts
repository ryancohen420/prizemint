import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  if (process.env.NODE_ENV !== "development") {
    console.log("⏭️ Skipping seed: Not in development environment");
    return;
  }

  await prisma.raffle.deleteMany(); // clean slate

  // Create or connect to an existing user
  const owner = await prisma.user.upsert({
    where: { address: "0xabc123..." },
    update: {},
    create: { address: "0xabc123..." },
  });

  await prisma.raffle.createMany({
    data: [
      {
        title: "Golden Charizard Giveaway",
        description: "Win a PSA 10 holographic Charizard card.",
        imageUrl: "https://i.imgur.com/ZKQbZ1T.png",
        priceEth: 0.02,
        ownerId: owner.id,
      },
      {
        title: "Rare Seiko Watch Raffle",
        description: "Vintage Seiko 6139 automatic chronograph.",
        imageUrl: "https://i.imgur.com/1IHxBzd.png",
        priceEth: 0.05,
        ownerId: owner.id,
      },
    ],
  });

  console.log("✅ Sample raffles seeded");
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
