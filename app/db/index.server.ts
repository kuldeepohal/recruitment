import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { runMigrations } from "./migrations.server";

export type AppDb = ReturnType<typeof createDb>;

let migrationPromise: Promise<void> | null = null;

async function ensureMigrations() {
  if (!migrationPromise) {
    migrationPromise = runMigrations().catch((error) => {
      migrationPromise = null;
      throw error;
    });
  }
  await migrationPromise;
}

export async function createDb() {
  const url = process.env.DATABASE_URL;
  const authToken = process.env.DATABASE_AUTH_TOKEN;

  if (!url) {
    throw new Error("DATABASE_URL is not configured.");
  }

  await ensureMigrations();

  const client = createClient({
    url,
    ...(authToken ? { authToken } : {}),
  });

  return drizzle(client, { schema });
}
