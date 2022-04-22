import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  secret: process.env.SECRET,
  session: { jwt: true, maxAge: 30 * 60 },
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        try {
          return { userName: "suneelfm", password: "Suneel@123" };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  page: {
    signIn: "/auth/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return url;
    },
    async session({ session, token }) {
      const { user, accessToken, error } = token;
      return { ...session, user, accessToken, error };
    },
    async signIn({ user }) {
      if (user?.error) return false;
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
});
