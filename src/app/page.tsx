"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Mobile Backdrop */}
      {menuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-40 backdrop-blur-sm transition-opacity duration-300" />
      )}

      {/* Mobile Dropdown */}
      <div
        ref={menuRef}
        className={`fixed top-20 right-4 z-50 w-52 bg-black rounded-xl p-4 shadow-xl border border-white/10 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      ></div>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-20 z-10 relative">
        <h1 className="text-5xl font-extrabold mb-6">
          🎉 Welcome to <span className="text-green-400">PrizeMint</span>
        </h1>
        <p className="text-xl max-w-xl mb-8">
          Buy and sell collectibles through raffles using NFTs as tickets. Fair
          draws, real prizes, secured by Web3.
        </p>
        <Link href="/marketplace">
          <button className="bg-green-400 hover:bg-green-500 text-black px-6 py-3 rounded-xl text-lg font-semibold transition">
            🚀 Enter Marketplace
          </button>
        </Link>
      </div>
    </main>
  );
}
