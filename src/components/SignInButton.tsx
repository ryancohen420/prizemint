"use client";

import { useSIWE } from "@/lib/siwe";
import { useAccount, useEnsName } from "wagmi";
import { useState, useEffect } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaCopy, FaChevronDown } from "react-icons/fa";
import { toast } from "react-hot-toast";

export default function SignInButton() {
  // ✅ All hooks called FIRST, before any early return
  const [hasMounted, setHasMounted] = useState(false);
  const { isSignedIn, isSigningIn, signIn, signOut } = useSIWE();
  const { isConnected, address } = useAccount();
  const { data: ensName } = useEnsName({ address: address as `0x${string}` });
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // ✅ Now it's safe to conditionally return
  if (!hasMounted) return null;

  const shortAddr = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : "";

  const handleCopy = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast.success("Address copied!");
    }
  };

  if (!isConnected) {
    return <ConnectButton />;
  }

  if (!isSignedIn) {
    return (
      <button
        onClick={signIn}
        disabled={isSigningIn}
        className="bg-green-400 text-black px-4 py-2 rounded-lg font-semibold hover:bg-green-500 transition disabled:opacity-50"
      >
        {isSigningIn ? "Signing..." : "Sign In"}
      </button>
    );
  }

  return (
    <div className="relative text-white">
      <button
        onClick={() => setDropdownOpen((prev) => !prev)}
        className="bg-white/10 px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-white/20 transition"
      >
        <span className="truncate max-w-[100px]">{ensName || shortAddr}</span>
        <FaChevronDown size={14} />
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 bg-black border border-white/10 shadow-lg rounded-lg p-4 z-50 w-56">
          <div className="flex items-center justify-between mb-2">
            <div className="font-mono text-sm truncate">
              {ensName || shortAddr}
            </div>
            <button onClick={handleCopy} className="hover:text-green-400">
              <FaCopy size={14} />
            </button>
          </div>
          <div className="border-t border-white/10 my-2" />
          <button
            onClick={() => {
              setDropdownOpen(false);
              signOut();
            }}
            className="text-red-400 hover:text-red-500 text-sm font-semibold w-full text-left"
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
