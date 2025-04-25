"use client";

import { useState } from "react";
import { useAccount, useSignMessage, useDisconnect, useConnect } from "wagmi";
import { signIn, signOut, useSession } from "next-auth/react";

export function useSIWE() {
  const { data: session } = useSession();
  const { isConnected, address, chain } = useAccount();
  const { connectAsync, connectors } = useConnect();
  const { signMessageAsync } = useSignMessage();
  const { disconnect } = useDisconnect();

  const [isSigningIn, setIsSigningIn] = useState(false);

  async function signInWithSIWE() {
    try {
      setIsSigningIn(true);

      if (!isConnected) {
        console.log("🔍 Available connectors:", connectors);
        const connector = connectors.find((c) => c.ready);
        if (!connector) {
          console.error("❌ No wallet connector is available");
          return;
        }
        await connectAsync({ connector });
      }
      

      const res = await fetch("/api/auth/siwe/request-message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          address,
          chainId: Number(chain?.id),
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        console.error("❌ Failed to fetch SIWE message", errData);
        return;
      }

      const { message } = await res.json();
      const signature = await signMessageAsync({ message });

      await signIn("credentials", {
        message,
        signature,
        redirect: false,
      });
    } catch (error) {
      console.error("SIWE sign-in failed:", error);
    } finally {
      setIsSigningIn(false);
    }
  }

  return {
    isSignedIn: !!session?.user,
    isSigningIn,
    signIn: signInWithSIWE,
    signOut: () => {
      disconnect();
      signOut({ redirect: false });
    },
    session,
  };
}
