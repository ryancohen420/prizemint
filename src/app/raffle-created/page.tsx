"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Confetti from "react-confetti";

function RaffleCreatedContent() {
  const searchParams = useSearchParams();
  const raffleId = searchParams.get("id");

  const [showConfetti, setShowConfetti] = useState(true);
  const [mounted, setMounted] = useState(false); // <== NEW

  useEffect(() => {
    setMounted(true); // Now we know it's on client side
    const timeout = setTimeout(() => {
      setShowConfetti(false);
    }, 10000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-dark text-light p-8 space-y-6 relative">
      {mounted && showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      <h1 className="text-4xl font-bold text-primary">🎉 Raffle Created!</h1>

      <p className="text-center text-lg">
        Your raffle has been successfully created.
      </p>

      {raffleId && (
        <p className="text-center text-muted text-sm">
          View your raffle:{" "}
          <Link
            href={`/raffles/${raffleId}`}
            className="underline hover:text-primary"
          >
            {raffleId}
          </Link>
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

export default function RaffleCreatedPage() {
  return (
    <Suspense
      fallback={<div className="text-light p-8">Loading raffle...</div>}
    >
      <RaffleCreatedContent />
    </Suspense>
  );
}
