// src/types/next-auth.d.ts

declare module "next-auth" {
  interface Session {
    user?: {
      id: string;
      address: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
    address?: string; // Optional if you're also adding it directly to session
  }

  interface User {
    id: string;
    address: string;
    name?: string | null;
    email?: string | null;
    image?: string | null;
  }
}