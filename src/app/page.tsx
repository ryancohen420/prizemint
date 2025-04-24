"use client";

import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-black text-white">
      {/* Nav Bar */}
      <nav className="w-full px-6 py-4 flex justify-between items-center bg-black bg-opacity-30 backdrop-blur-md">
        <div className="text-2xl font-bold text-green-400">PrizeMint</div>
        <div className="hidden md:flex space-x-6 text-white text-lg">
          <a href="/raffles" className="hover:text-green-400 transition">
            Browse Raffles
          </a>
          <a href="/my-raffles" className="hover:text-green-400 transition">
            My Raffles
          </a>
        </div>
        <ConnectButton />
      </nav>

      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center px-6 py-20">
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
