// src/types/next-auth.d.ts

import { DefaultSession, DefaultUser } from "next-auth"
import { JWT as DefaultJWT }       from "next-auth/jwt"

// — extend the core Session type —
declare module "next-auth" {
  interface Session extends DefaultSession {
    user?: DefaultSession["user"] & {
      id:       string
      address:  string
      username?: string | null
    }
  }

  // when you consume `user` in callbacks, it will be DefaultUser + these
  interface User extends DefaultUser {
    id:       string
    address:  string
    username?: string | null
  }
}

// — extend the JWT payload type —
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    address?:  string
    username?: string | null
  }
}

// — extend the AdapterUser that PrismaAdapter returns —
declare module "next-auth/adapters" {
  interface AdapterUser extends DefaultUser {
    id:       string
    address:  string
    username?: string | null
  }
}
