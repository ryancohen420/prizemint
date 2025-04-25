// src/lib/session.ts
import type { NextAuthOptions } from "next-auth";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { SiweMessage } from "siwe";

const prisma = new PrismaClient();

// Our central NextAuth configuration
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma), // Tells NextAuth how to interact with our DB
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message: { label: "Message", type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials, req) {
        try {
          const siwe = new SiweMessage(credentials?.message || "");
      
          const result = await siwe.verify({
            signature: credentials?.signature || "",
            domain: new URL(process.env.NEXTAUTH_URL!).host,
            nonce: (req as { cookies?: Map<string, { value: string }> }).cookies?.get("siwe_nonce")?.value,
          });
      
          if (!result.success) return null;
      
          const user = await prisma.user.upsert({
            where: { address: siwe.address },
            create: { address: siwe.address },
            update: { lastLogin: new Date() },
          });
      
          return {
            id: user.id,
            address: user.address,
          };
        } catch (e) {
          console.error("Authorize error:", e);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // So we can store the user info in a JWT rather than DB sessions
  },
  callbacks: {
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.address = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) token.sub = user.id;
      return token;
    },
  },
};
