"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SignInButton from "./SignInButton"; // ✅ CORRECT for default export

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-black bg-opacity-30 backdrop-blur-md relative z-50">
      <div className="text-2xl font-bold text-green-400">PrizeMint</div>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-6 text-white text-lg">
        <Link href="/raffles" className="hover:text-green-400 transition">
          Browse Raffles
        </Link>
        <Link href="/my-raffles" className="hover:text-green-400 transition">
          My Raffles
        </Link>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <SignInButton />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-2 p-2 rounded bg-white/10 hover:bg-white/20"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

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
      >
        <nav className="flex flex-col space-y-4 text-lg">
          <Link
            href="/raffles"
            className="hover:text-green-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            Browse Raffles
          </Link>
          <Link
            href="/my-raffles"
            className="hover:text-green-400 transition"
            onClick={() => setMenuOpen(false)}
          >
            My Raffles
          </Link>
        </nav>
      </div>
    </nav>
  );
}
