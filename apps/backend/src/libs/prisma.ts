import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { logger } from "./logger.lib";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Test database connection with retry logic
 */
export async function testDatabaseConnection(
  maxRetries: number = 3,
  retryDelay: number = 2000
): Promise<boolean> {
  let retries = 0;

  while (retries < maxRetries) {
    try {
      logger.info("Testing database connection...", {
        attempt: retries + 1,
        maxRetries,
      });

      // Execute a simple query to test connection
      await prisma.$queryRaw`SELECT 1`;

      logger.info("✅ Database connection successful");
      return true;
    } catch (error) {
      retries++;
      const isLastRetry = retries >= maxRetries;

      logger.error(
        `Database connection failed (attempt ${retries}/${maxRetries})`,
        {
          error:
            error instanceof Error
              ? {
                  name: error.name,
                  message: error.message,
                  code: (error as any).code,
                }
              : error,
          willRetry: !isLastRetry,
        }
      );

      if (isLastRetry) {
        return false;
      }

      // Wait before retrying
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
    }
  }

  return false;
}

/**
 * Get database connection status
 */
export async function getDatabaseStatus(): Promise<{
  connected: boolean;
  latency?: number;
  error?: string;
}> {
  const startTime = Date.now();

  try {
    await prisma.$queryRaw`SELECT 1`;
    const latency = Date.now() - startTime;

    return {
      connected: true,
      latency,
    };
  } catch (error) {
    return {
      connected: false,
      error:
        error instanceof Error
          ? error.message
          : "Unknown database connection error",
    };
  }
}
