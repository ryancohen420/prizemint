// src/lib/session.ts
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { SiweMessage } from "siwe";

const prisma = new PrismaClient();

// Central NextAuth configuration
export const authOptions = {
  adapter: PrismaAdapter(prisma),
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
            nonce: (req as {
              cookies?: { get: (key: string) => { value: string } | undefined };
            }).cookies?.get("siwe_nonce")?.value,
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
    strategy: "jwt" as const,
  },
  callbacks: {
    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
      user?: User;
      trigger?: "update";
      newSession?: Session;
    }): Promise<Session> {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.address = token.address as string;
      }
      session.address = token.address as string;
      return session;
    },

    async jwt({
      token,
      user,
    }: {
      token: JWT;
      user?: User;
    }): Promise<JWT> {
      if (user) {
        token.sub = user.id;
        token.address = user.address;
      }
      return token;
    },
  },
};