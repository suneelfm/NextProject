import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  session: { jwt: true, maxAge: 30 * 60 },
  providers: [
    CredentialsProvider({
      name: "Credentials",
    //   credentials: {
    //     userName: { label: "Username", type: "text" },
    //     password: { label: "Password", type: "password" },
    //   },
      async authorize(credentials) {
        try {
          return { userName: "suneelfm", password: "Suneel@123" };
        } catch (error) {}
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
