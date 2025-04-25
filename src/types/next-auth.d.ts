// src/types/next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    address: string;
  }
  interface User {
    id: string;
    address: string;
  }
}