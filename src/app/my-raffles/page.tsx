"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

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
  const { status } = useSession(); // 🔥 only status, no session
  const signedIn = status === "authenticated";
  const [raffles, setRaffles] = useState<Raffle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!signedIn) return;
    fetch("/api/raffles/my")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRaffles(data);
        } else {
          setRaffles([]);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [signedIn]);

  if (status === "loading") {
    return <div className="p-8 text-light">Checking authentication...</div>;
  }

  if (!signedIn) {
    return (
      <div className="p-8 flex flex-col items-center text-center space-y-8">
        <div className="text-6xl">🔐</div>

        <h1 className="text-4xl font-bold text-primary">Connect Your Wallet</h1>

        <p className="text-light text-md max-w-md">
          To view and manage your raffles, please connect your Ethereum wallet.
          <br />
          New to Web3? Download a wallet app to get started!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <a
            href="https://apps.apple.com/app/apple-store/id1457119021"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <img
              src="/badges/appstore.svg"
              alt="Download on the App Store"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </a>
          <a
            href="https://play.google.com/store/apps/details?id=me.rainbow"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition"
          >
            <img
              src="/badges/googleplay.png"
              alt="Get it on Google Play"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </a>
        </div>

        <p className="text-muted text-sm mt-4 max-w-xs">
          After installing, come back and connect your wallet!
        </p>
      </div>
    );
  }

  if (loading) {
    return <div className="p-8 text-light">Loading your raffles…</div>;
  }

  if (raffles.length === 0) {
    return (
      <div className="p-8 text-center space-y-6">
        <h1 className="text-3xl font-bold text-primary">My Raffles</h1>
        <p className="text-light">{"You haven't created any raffles yet."}</p>
        <Link
          href="/create-raffle"
          className="inline-block mt-6 bg-primary text-black font-semibold px-6 py-3 rounded-lg hover:bg-green-500 transition"
        >
          Create Your First Raffle
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
