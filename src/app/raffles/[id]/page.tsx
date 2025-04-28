import { notFound } from "next/navigation";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

type ParamsPromise = Promise<{ id: string }>;

export default async function RafflePage(props: { params: ParamsPromise }) {
  const { id } = await props.params; // ✅ await inside the function body

  const raffle = await prisma.raffle.findUnique({
    where: { id },
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
  });

  if (!raffle) return notFound();

  const endsAt = raffle.endsAt
    ? new Date(raffle.endsAt).toLocaleString()
    : "No end date";
  const isEnded = raffle.endsAt ? new Date(raffle.endsAt) < new Date() : false;

  return (
    <div className="min-h-screen p-8 bg-dark text-light flex flex-col items-center">
      <div className="max-w-2xl w-full space-y-8">
        {raffle.imageUrl && (
          <img
            src={raffle.imageUrl}
            alt={raffle.title}
            className="rounded-lg w-full h-80 object-cover shadow-lg"
          />
        )}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-primary">{raffle.title}</h1>
          <p className="text-mid">{raffle.description}</p>
          <div className="space-y-2 text-lg">
            <div>
              🪙 <strong>{raffle.priceEth}</strong> ETH per ticket
            </div>
            <div>
              🎟️{" "}
              <strong>
                {raffle.ticketsSold}/{raffle.ticketSupply}
              </strong>{" "}
              tickets sold
            </div>
            <div>
              👤 Seller:{" "}
              {raffle.owner?.address
                ? shortenAddress(raffle.owner.address)
                : "Unknown"}
            </div>
            <div>⏰ {isEnded ? "Ended" : `Ends: ${endsAt}`}</div>
          </div>
          {!isEnded && (
            <button className="mt-6 w-full py-3 rounded-lg bg-primary hover:bg-secondary text-black font-bold transition">
              Enter Raffle (Coming Soon)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function shortenAddress(addr: string) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}
