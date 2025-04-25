import { PrismaClient, Raffle } from "@prisma/client";

export default async function RafflesPage() {
  let raffles: Raffle[] = [];

  if (process.env.DATABASE_URL) {
    const prisma = new PrismaClient();
    raffles = await prisma.raffle.findMany({
      orderBy: { createdAt: "desc" },
    });
  } else {
    console.warn("⚠️ Skipping DB fetch: DATABASE_URL not set (likely Vercel)");
  }

  return (
    <main className="p-6 text-white">
      <h1 className="text-3xl font-bold mb-6">🎟️ Browse Raffles</h1>

      {raffles.length === 0 && (
        <p className="text-gray-400">No raffles available (DB disabled)</p>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {raffles.map((raffle) => (
          <div key={raffle.id} className="bg-gray-800 rounded-xl p-4 shadow-md">
            <img
              src={raffle.imageUrl}
              alt={raffle.title}
              className="rounded-lg w-full h-48 object-cover mb-4"
            />
            <h2 className="text-xl font-semibold">{raffle.title}</h2>
            <p className="text-sm text-gray-300 mb-2">{raffle.description}</p>
            <p className="text-green-400 font-bold">{raffle.priceEth} ETH</p>
          </div>
        ))}
      </div>
    </main>
  );
}
