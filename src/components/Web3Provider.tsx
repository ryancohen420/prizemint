"use client";

import React from "react";
import "@rainbow-me/rainbowkit/styles.css";
import {
  RainbowKitProvider,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";

import { WagmiProvider, createStorage } from "wagmi";

import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const chains = [mainnet, polygon, optimism, arbitrum] as const;

const config = getDefaultConfig({
  appName: "PrizeMint",
  projectId: "be5d9a7d9e207e7d81ae74c0e5c694ab",
  chains,
  ssr: true,
  storage: createStorage({
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  }),
});

const queryClient = new QueryClient();

export function Web3Provider({ children }: { children: React.ReactNode }) {
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
