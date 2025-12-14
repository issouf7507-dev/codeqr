import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient({
  datasources: {
    db: {
      adapter: "mysql", // ou "postgresql" selon ton cas
      url: process.env.DATABASE_URL,
    },
  },
});
