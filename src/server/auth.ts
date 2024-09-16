import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { eq } from "drizzle-orm";
import NextAuth from "next-auth";
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import KeycloakProvider from "next-auth/providers/keycloak";

import { env } from "~/env";
import { db } from "~/server/db";
import {
  accounts,
  sessions,
  users,
  verificationTokens,
} from "~/server/db/schema";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const authOptions: NextAuthConfig = {
  callbacks: {
    session: ({ session, user }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: user.id,
        },
      };
    },
  },
  events: {
    signIn: async ({ account }) => {
      if (typeof account?.providerAccountId === "string") {
        await db
          .update(accounts)
          .set({
            access_token:
              typeof account.access_token === "string"
                ? account.access_token
                : undefined,
            refresh_token:
              typeof account.refresh_token === "string"
                ? account.refresh_token
                : undefined,
            expires_at:
              typeof account.expires_at === "number"
                ? account.expires_at
                : undefined,
            id_token:
              typeof account.id_token === "string"
                ? account.id_token
                : undefined,
            // refresh_expires_in:
            //   typeof account.refresh_expires_in === "number"
            //     ? account.refresh_expires_in
            //     : undefined,
          })
          .where(eq(accounts.providerAccountId, account.providerAccountId));
      }
    },
    signOut: async (message) => {
      console.log("message", message);
      if ("session" in message && message.session) {
        const accountFromDB = await db
          .select()
          .from(accounts)
          .where(eq(accounts.userId, message.session.userId))
          .limit(1);

        const account = accountFromDB[0];
        if (account) {
          if (account.provider === "keycloak") {
            const client_id = env.KEYCLOAK_CLIENT_ID;
            const client_secret = env.KEYCLOAK_CLIENT_SECRET;
            const refresh_token = account.refresh_token;
            const issuer = env.KEYCLOAK_ISSUER;

            const params = new URLSearchParams();
            if (refresh_token) params.append("refresh_token", refresh_token);
            if (client_id) params.append("client_id", client_id);
            if (client_secret) params.append("client_secret", client_secret);

            try {
              const result = await fetch(
                `${issuer}/protocol/openid-connect/logout`,
                {
                  method: "POST",
                  body: params.toString(),
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                  },
                },
              );
              if (!result.ok) {
                console.error(
                  `Keycloak logout failed: ${result.status} ${result.statusText}`,
                );
              }
              console.log(await result.text());
            } catch (error) {
              console.error("Error during Keycloak logout:", error);
            }
          }
        } else {
          console.error(
            `No account found for user ID during signout: ${message.session.userId}`,
          );
        }
      }
    },
  },
  adapter: DrizzleAdapter(db, {
    usersTable: users,
    accountsTable: accounts,
    sessionsTable: sessions,
    verificationTokensTable: verificationTokens,
  }),
  providers: [
    KeycloakProvider({
      clientId: env.KEYCLOAK_CLIENT_ID,
      clientSecret: env.KEYCLOAK_CLIENT_SECRET,
      issuer: env.KEYCLOAK_ISSUER,
    }),
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions);
