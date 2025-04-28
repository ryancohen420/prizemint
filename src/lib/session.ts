import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider                from "next-auth/providers/credentials";
import { PrismaAdapter }                 from "@next-auth/prisma-adapter";
import prisma                            from "@/lib/prisma";
import { SiweMessage }                   from "siwe";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Ethereum",
      credentials: {
        message:   { label: "Message",   type: "text" },
        signature: { label: "Signature", type: "text" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const siwe = new SiweMessage(credentials.message);
          const { success, data } = await siwe.verify({
            signature: credentials.signature,
            // lookup the persisted nonce
            nonce: (
              await prisma.nonce.findUniqueOrThrow({
                where: { id: siwe.nonce },
              })
            ).value,
          });
          if (!success) return null;

          // delete the nonce so it cannot be replayed
          await prisma.nonce.delete({ where: { id: data.nonce } });

          const address = data.address.toLowerCase();
          // upsert the user record
          const user = await prisma.user.upsert({
            where:  { address },
            create: { address },
            update: {},
          });
          return user;
        } catch {
          return null;
        }
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub      = user.id;
        token.address  = user.address;
        token.username = (user as any).username ?? null;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id       = token.sub as string;
        session.user.address  = token.address as string;
        session.user.username = token.username as string | null;
      }
      return session;
    },
  },

  pages: { signIn: "/signin" },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
