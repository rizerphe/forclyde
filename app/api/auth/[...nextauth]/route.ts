import NextAuth from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { login } from "@/lib/server_auth";

const handler = NextAuth({
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID || "",
      clientSecret: process.env.DISCORD_CLIENT_SECRET || "",
      authorization: {
        params: {
          scope: "identify",
        },
      },
    }),
  ],
  callbacks: {
    session: async ({ session, token, user }) => {
      if (session?.user && token.sub) {
        const firebase_token = await login(token.sub);
        return Promise.resolve({
          ...session,
          user: {
            ...session.user,
            firebase_token,
            id: token.sub,
          },
        });
      }
      return Promise.resolve(session);
    },
  },
});

export { handler as GET, handler as POST };
