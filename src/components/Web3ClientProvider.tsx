// src/components/Web3ClientProvider.tsx
"use client";
console.log("🔐 Web3ClientProvider loaded");

import { useMemo } from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import { WagmiProvider, createStorage } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// ✅ Declare ONCE outside the component
const chains = [mainnet, polygon, optimism, arbitrum] as const;
const queryClient = new QueryClient();

export function Web3ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // ✅ Memoize config to prevent double-inits
  const config = useMemo(
    () =>
      getDefaultConfig({
        appName: "PrizeMint",
        projectId: "be5d9a7d9e207e7d81ae74c0e5c694ab",
        chains,
        ssr: false,
        storage: createStorage({
          storage:
            typeof window !== "undefined" ? window.localStorage : undefined,
        }),
      }),
    []
  );

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({ accentColor: "#22c55e" })}
          modalSize="compact"
        >
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
