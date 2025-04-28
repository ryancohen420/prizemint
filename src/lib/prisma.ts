// src/lib/prisma.ts
import { PrismaClient } from "@prisma/client";

/* eslint-disable no-var */
declare global {
  // allow global var across hot-reloads in dev
  var __globalPrisma: PrismaClient | undefined;
}
/* eslint-enable no-var */

const prisma =
  global.__globalPrisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
  });

if (process.env.NODE_ENV === "development") {
  global.__globalPrisma = prisma;
}

export default prisma;
