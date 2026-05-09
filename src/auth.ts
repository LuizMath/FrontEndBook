import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createUser } from "./lib/api";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user }) {
      if (!user.email) return false;
      try {
        await createUser({
          name: user.name ?? "",
          email: user.email ?? "",
          avatarurl: user.image ?? "",
        });
      } catch (err) {
        console.log("failed to fetch", err);
      }
      return true;
    },
  },
});
