"use client";

import { useSIWE } from "@/lib/siwe";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function SignInButton() {
  const { isConnected } = useAccount();
  const { isSignedIn, signIn, signOut } = useSIWE();

  if (!isConnected) {
    return <ConnectButton />;
  }

  return isSignedIn ? (
    <button
      onClick={signOut}
      className="bg-red-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-red-500 transition"
    >
      Sign Out
    </button>
  ) : (
    <button
      onClick={signIn}
      className="bg-green-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-500 transition"
    >
      Sign In
    </button>
  );
}
