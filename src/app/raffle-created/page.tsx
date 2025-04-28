"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function RaffleCreatedPage() {
  const searchParams = useSearchParams();
  const raffleId = searchParams.get("id");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark text-light p-8 space-y-6">
      <h1 className="text-4xl font-bold text-primary">🎉 Raffle Created!</h1>

      <p className="text-center text-lg">
        Your raffle has been successfully created.
      </p>

      {raffleId && (
        <p className="text-center text-muted text-sm">
          Raffle ID: <span className="font-mono">{raffleId}</span>
        </p>
      )}

      <div className="flex space-x-4 mt-8">
        <Link
          href="/my-raffles"
          className="bg-primary hover:bg-secondary text-black font-semibold px-6 py-2 rounded transition"
        >
          View My Raffles
        </Link>

        <Link
          href="/create-raffle"
          className="bg-light hover:bg-muted text-dark font-semibold px-6 py-2 rounded transition border border-muted"
        >
          Create Another
        </Link>
      </div>
    </div>
  );
}
