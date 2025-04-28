// src/components/Web3ClientProvider.tsx
"use client";

// ————————————————
// 1) Monkey-patch define so duplicate custom elements are silently ignored
// ————————————————
if (typeof window !== "undefined") {
  const registry = window.customElements;
  const originalDefine = registry.define.bind(registry);
  registry.define = (
    name: string,
    constructor: CustomElementConstructor,
    options?: ElementDefinitionOptions
  ) => {
    if (registry.get(name)) {
      console.warn(`Skipped duplicate custom element registration: ${name}`);
      return;
    }
    originalDefine(name, constructor, options);
  };
}

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

// chains & queryClient can stay at module‐scope
const chains = [mainnet, polygon, optimism, arbitrum] as const;
const queryClient = new QueryClient();

// ————————————————
// 2) Hoist getDefaultConfig so it only ever runs once per full page-load
// ————————————————
const wagmiConfig = getDefaultConfig({
  appName: "PrizeMint",
  projectId: "be5d9a7d9e207e7d81ae74c0e5c694ab",
  chains,
  ssr: false,
  storage: createStorage({
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  }),
});

export function Web3ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <WagmiProvider config={wagmiConfig}>
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
