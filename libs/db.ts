import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient } from "@/generated/client";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

function createPrismaClient() {
  const { DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME } =
    process.env;

  // Avoid failing Next.js build/collect phase when env isn't present.
  if (
    !DATABASE_HOST ||
    !DATABASE_USER ||
    !DATABASE_PASSWORD ||
    !DATABASE_NAME
  ) {
    return null;
  }

  const adapter = new PrismaMariaDb({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    password: DATABASE_PASSWORD,
    database: DATABASE_NAME,
    connectionLimit: 5,
  });

  return new PrismaClient({ adapter });
}

function getPrisma(): PrismaClient {
  const existing = globalForPrisma.prisma;
  if (existing) return existing;

  const created = createPrismaClient();
  if (!created) {
    throw new Error(
      "Database env vars are missing (DATABASE_HOST, DATABASE_USER, DATABASE_PASSWORD, DATABASE_NAME)",
    );
  }

  if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = created;
  return created;
}

export const prisma = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    return getPrisma()[prop as keyof PrismaClient];
  },
});

export { getPrisma };
