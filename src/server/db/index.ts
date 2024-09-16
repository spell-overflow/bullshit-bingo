import { Client } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";

import { env } from "~/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  client: Client | undefined;
};

export const client =
  globalForDb.client ?? new Client({ connectionString: env.DATABASE_URL });
if (!globalForDb.client) {
  await client.connect();
}
if (env.NODE_ENV !== "production") globalForDb.client = client;

export const db = drizzle(client, { schema });
