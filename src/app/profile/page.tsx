"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import SignInButton from "@/components/SignInButton";
import { useEnsAvatar } from "wagmi";
import { FaCopy, FaEye, FaEyeSlash } from "react-icons/fa";
import Link from "next/link"; // ✅ new import

type Raffle = {
  id: string;
  title: string;
  ticketsSold: number;
  ticketSupply: number;
  isActive: boolean;
};

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const [username, setUsername] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showAddr, setShowAddr] = useState(false);
  const [recentRaffles, setRecentRaffles] = useState<Raffle[]>([]); // ✅ new

  const address = session?.user?.address;
  const { data: avatarUrl } = useEnsAvatar({
    name: address as `0x${string}` | undefined,
  });

  useEffect(() => {
    if (status !== "authenticated") return;

    fetch("/api/user")
      .then((res) => res.json())
      .then((u) => setUsername(u.username || ""))
      .catch(() => setError("Could not load profile"));

    // ✅ Fetch recent raffles
    fetch("/api/raffles/mine")
      .then((res) => res.json())
      .then((data) => {
        setRecentRaffles(data.slice(0, 3)); // only 3 latest raffles
      })
      .catch(() => {
        setRecentRaffles([]);
      });
  }, [status]);

  const save = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    const res = await fetch("/api/user", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    setLoading(false);
    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error || "Save failed");
      return;
    }
    setSuccess("Profile updated!");
    setTimeout(() => setSuccess(null), 3000);
  };

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      setSuccess("Address copied!");
      setTimeout(() => setSuccess(null), 1500);
    }
  };

  if (status === "loading") {
    return <p className="text-light text-center mt-8">Loading session…</p>;
  }

  if (status === "unauthenticated") {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-light">
        <p className="mb-4">
          Please connect your wallet to manage your profile.
        </p>
        <SignInButton />
      </div>
    );
  }

  const fullAddr = address!;
  const masked = `${fullAddr.slice(0, 6)}…${fullAddr.slice(-4)}`;

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-dark py-12 px-4 space-y-12">
      <div className="w-full max-w-md bg-light rounded-2xl shadow-xl p-8 space-y-6">
        <div className="flex justify-center">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt="ENS Avatar"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-2xl text-black">
              {fullAddr.slice(2, 4).toUpperCase()}
            </div>
          )}
        </div>

        <h1 className="text-3xl font-bold text-dark text-center">
          Your Profile
        </h1>

        <div>
          <label className="block text-mid mb-1">Wallet Address</label>
          <div className="flex items-center bg-white rounded-md overflow-hidden">
            <div className="flex-1 px-3 py-2 font-mono text-sm break-all">
              {showAddr ? fullAddr : masked}
            </div>
            <button
              onClick={() => setShowAddr((s) => !s)}
              className="px-3 hover:bg-muted transition"
              title={showAddr ? "Hide address" : "Show address"}
            >
              {showAddr ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button
              onClick={copyAddress}
              className="px-3 hover:bg-muted transition"
              title="Copy to clipboard"
            >
              <FaCopy />
            </button>
          </div>
        </div>

        <div>
          <label htmlFor="username" className="block text-mid mb-1">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.currentTarget.value)}
            className="w-full px-3 py-2 border border-muted rounded-md focus:outline-none focus:ring-2 focus:ring-primary bg-white text-dark"
            placeholder="Choose a username"
          />
        </div>

        <button
          onClick={save}
          disabled={loading}
          className="w-full py-2 font-semibold rounded-md transition disabled:opacity-50 bg-primary hover:bg-secondary text-black"
        >
          {loading ? "Saving…" : "Save Changes"}
        </button>

        {error && <p className="text-center text-red-500">{error}</p>}
        {success && <p className="text-center text-green-500">{success}</p>}
      </div>

      {/* ✅ New Raffle Summary Section */}
      {recentRaffles.length > 0 && (
        <div className="w-full max-w-md bg-light rounded-2xl shadow-xl p-6 space-y-4">
          <h2 className="text-2xl font-bold text-dark text-center">
            Your Recent Raffles
          </h2>

          <div className="space-y-2">
            {recentRaffles.map((raffle) => (
              <div
                key={raffle.id}
                className="p-4 border border-muted rounded-md bg-white flex flex-col space-y-1"
              >
                <div className="font-semibold">{raffle.title}</div>
                <div className="text-sm text-mid">
                  🎟️ {raffle.ticketsSold}/{raffle.ticketSupply} tickets sold
                </div>
                <div className="text-sm text-muted">
                  {raffle.isActive ? "Active" : "Ended"}
                </div>
              </div>
            ))}
          </div>

          <Link
            href="/my-raffles"
            className="inline-block w-full mt-4 px-6 py-2 bg-primary hover:bg-secondary text-black font-semibold text-center rounded-md transition"
          >
            View All My Raffles
          </Link>
        </div>
      )}
    </div>
  );
}
