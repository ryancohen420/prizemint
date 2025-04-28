// src/app/raffles/page.tsx
import { PrismaClient, Raffle } from "@prisma/client";

export default async function RafflesPage() {
  let raffles: Raffle[] = [];

  if (process.env.DATABASE_URL) {
    const prisma = new PrismaClient();
    raffles = await prisma.raffle.findMany({
      orderBy: { createdAt: "desc" },
    });
  } else {
    console.warn("⚠️ Skipping DB fetch: DATABASE_URL not set");
  }

  return (
    <main className="min-h-screen bg-dark text-light px-6 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Browse</h1>

      {raffles.length === 0 && (
        <p className="text-muted">No raffles available (DB disabled)</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {raffles.map((raffle) => (
          <div
            key={raffle.id}
            className="bg-light rounded-xl p-4 shadow-md hover:shadow-secondary/40 transition"
          >
            <img
              src={raffle.imageUrl}
              alt={raffle.title}
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold mb-2 text-dark">
              {raffle.title}
            </h2>
            <p className="text-sm text-mid mb-2">{raffle.description}</p>
            <p className="text-primary font-bold">{raffle.priceEth} ETH</p>
          </div>
        ))}
      </div>
    </main>
  );
}
