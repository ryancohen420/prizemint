"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import SignInButton from "@/components/SignInButton"; // <-- Adjust path if needed

type Raffle = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  ticketSupply: number;
  ticketsSold: number;
  priceEth: number;
  isActive: boolean;
  createdAt: string;
  endsAt: string | null;
  owner: {
    address: string;
  } | null;
};

export default function MyRafflesPage() {
  const { data: session, status } = useSession();
  const signedIn = status === "authenticated";
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!signedIn) return;
    fetch("/api/raffles/mine")
      .then((res) => res.json())
      .then((data) => {
        setRaffles(data || []);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [signedIn]);

  if (status === "loading" || (signedIn && loading)) {
    return (
      <div className="min-h-screen flex items-center justify-center text-light">
        Loading...
      </div>
    );
  }

  if (status === "unauthenticated" || !session) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-light space-y-6">
        <h1 className="text-3xl font-bold text-center">
          You must connect your wallet
        </h1>
        <p className="text-lg text-dark text-center">
          Sign in with Ethereum to view and manage your raffles.
        </p>
        <SignInButton />
      </div>
    );
  }

  if (raffles.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-8 text-light space-y-6">
        <h1 className="text-3xl font-bold mb-4">My Raffles</h1>
        <p className="text-muted text-center">
          You have not created any raffles yet.
        </p>
        <Link
          href="/create-raffle"
          className="inline-block mt-4 px-6 py-2 bg-primary hover:bg-secondary text-black font-semibold rounded-md transition"
        >
          Create Raffle
        </Link>
      </div>
    );
  }

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold mb-6">My Raffles</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {raffles.map((raffle) => (
          <Link
            key={raffle.id}
            href={`/raffles/${raffle.id}`}
            className="border border-muted rounded-xl overflow-hidden shadow-lg bg-light flex flex-col hover:scale-105 transform transition duration-300"
          >
            {raffle.imageUrl && (
              <img
                src={raffle.imageUrl}
                alt={raffle.title}
                className="h-48 w-full object-cover"
              />
            )}
            <div className="p-4 flex flex-col flex-grow space-y-2">
              <h2 className="text-xl font-bold">{raffle.title}</h2>

              <div className="text-mid text-sm">
                🎟️ {raffle.ticketsSold}/{raffle.ticketSupply} tickets sold
              </div>

              <div className="text-mid text-sm">
                🪙 {raffle.priceEth} ETH per ticket
              </div>

              <div className="text-mid text-sm break-all">
                👤{" "}
                {raffle.owner?.address
                  ? shortenAddress(raffle.owner.address)
                  : "Unknown"}
              </div>

              <div className="text-sm text-muted mt-auto">
                {raffle.isActive
                  ? raffle.endsAt
                    ? `⏰ Ends: ${new Date(raffle.endsAt).toLocaleString()}`
                    : "Ongoing"
                  : "Ended"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function shortenAddress(addr: string) {
  return addr.slice(0, 6) + "..." + addr.slice(-4);
}
