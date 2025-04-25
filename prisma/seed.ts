// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.raffle.deleteMany(); // clean slate

  await prisma.raffle.createMany({
    data: [
      {
        title: "Golden Charizard Giveaway",
        description: "Win a PSA 10 holographic Charizard card.",
        imageUrl: "https://i.imgur.com/ZKQbZ1T.png",
        priceEth: 0.02,
        ownerAddress: "0xabc123...",
      },
      {
        title: "Rare Seiko Watch Raffle",
        description: "Vintage Seiko 6139 automatic chronograph.",
        imageUrl: "https://i.imgur.com/1IHxBzd.png",
        priceEth: 0.05,
        ownerAddress: "0xabc123...",
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