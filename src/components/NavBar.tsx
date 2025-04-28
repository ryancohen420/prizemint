// src/components/NavBar.tsx
"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react"; // ← new
import SignInButton from "./SignInButton";

export default function NavBar() {
  const { data: session, status } = useSession(); // ← new
  const signedIn = status === "authenticated"; // ← new

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
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  return (
    <nav className="w-full px-6 py-4 flex justify-between items-center bg-dark bg-opacity-30 backdrop-blur-md relative z-50">
      {/* Logo */}
      <Link
        href="/"
        className="text-2xl font-bold text-primary hover:text-secondary transition"
      >
        PrizeMint
      </Link>

      {/* Desktop Nav */}
      <div className="hidden md:flex space-x-6 text-light text-lg">
        <Link href="/raffles" className="hover:text-primary transition">
          Browse Raffles
        </Link>
        <Link href="/my-raffles" className="hover:text-primary transition">
          My Raffles
        </Link>
        {signedIn && (
          <Link href="/profile" className="hover:text-primary transition">
            Profile
          </Link>
        )}
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-2">
        <SignInButton />
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden ml-2 p-2 rounded bg-light/10 hover:bg-light/20 transition"
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile Backdrop */}
      {menuOpen && (
        <div className="fixed inset-0 bg-dark bg-opacity-70 z-40 backdrop-blur-sm transition-opacity duration-300" />
      )}

      {/* Mobile Dropdown */}
      <div
        ref={menuRef}
        className={`fixed top-20 right-4 z-50 w-52 bg-dark rounded-xl p-4 shadow-xl border border-muted/10 transition-all duration-300 ease-in-out ${
          menuOpen
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col space-y-4 text-light text-lg">
          <Link
            href="/raffles"
            className="hover:text-primary transition"
            onClick={() => setMenuOpen(false)}
          >
            Browse Raffles
          </Link>
          <Link
            href="/my-raffles"
            className="hover:text-primary transition"
            onClick={() => setMenuOpen(false)}
          >
            My Raffles
          </Link>
          {signedIn && (
            <Link
              href="/profile"
              className="hover:text-primary transition"
              onClick={() => setMenuOpen(false)}
            >
              Profile
            </Link>
          )}
        </nav>
      </div>
    </nav>
  );
}
