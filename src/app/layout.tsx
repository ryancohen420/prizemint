// src/app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { SessionClientProvider } from "@/components/SessionClientProvider";
import { Web3ClientProvider } from "@/components/Web3ClientProvider";
import NavBar from "@/components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PrizeMint",
  description: "NFT Raffle Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`
        ${geistSans.variable} ${geistMono.variable}
        antialiased
      `}
    >
      <body className="bg-light text-mid font-sans">
        <SessionClientProvider>
          <Web3ClientProvider>
            <NavBar />
            {children}
          </Web3ClientProvider>
        </SessionClientProvider>
      </body>
    </html>
  );
}
