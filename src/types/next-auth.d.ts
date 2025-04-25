// src/types/next-auth.d.ts

declare module "next-auth" {
  interface Session {
    address: string;
  }
  interface User {
    id: string;
    address: string;
  }
}