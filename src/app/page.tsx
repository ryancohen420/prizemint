// src/app/page.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
    <main className="min-h-screen bg-gradient-to-br from-dark via-mid to-primary text-light">
      {menuOpen && (
        <div className="fixed inset-0 bg-dark bg-opacity-70 z-40 backdrop-blur-sm transition-opacity duration-300" />
      )}
      <div
        ref={menuRef}
        className={`fixed top-20 right-4 z-50 w-52 bg-dark rounded-xl p-4 shadow-xl border border-muted/10 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        {/* mobile menu items */}
      </div>
      <div className="flex flex-col items-center justify-center text-center px-6 py-20 z-10 relative">
        <h1 className="text-5xl font-extrabold mb-6">
          🎉 Welcome to <span className="text-secondary">PrizeMint</span>
        </h1>
        <p className="text-xl max-w-xl mb-8 text-light">
          Buy and sell collectibles through raffles using NFTs as tickets. Fair
          draws, real prizes, secured by Web3.
        </p>
        <Link href="/marketplace">
          <button className="bg-primary hover:bg-secondary text-dark px-6 py-3 rounded-xl text-lg font-semibold transition">
            🚀 Enter Marketplace
          </button>
        </Link>
      </div>
    </main>
  );
}
