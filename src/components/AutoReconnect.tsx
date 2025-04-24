"use client";

import { useEffect } from "react";
import { useAccount, useConnect } from "wagmi";

export default function AutoReconnect() {
  const { isConnected } = useAccount();
  const { connect, connectors } = useConnect();

  useEffect(() => {
    const walletConnect = connectors.find((c) => c.id === "walletConnect");

    if (!isConnected && walletConnect) {
      // Try to reconnect if WalletConnect session exists
      connect({ connector: walletConnect });
    }
  }, [isConnected, connect, connectors]);

  return null;
}
