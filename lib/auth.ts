import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const res = await fetch("https://re-me-api.onrender.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          // console.log(data.user);
          return {
            ...data.user,
            token: data.token,
          };
        }
        return null;
      },
    }),
  ],
  callbacks: {
    session: ({ session, token, user }) => {
      // console.log("Session Callback", { session, token });
      if (session?.user) {
        session.user = token.user;
      }
      return session;
    },
    jwt: (res) => {
      // console.log("JWT Callback", { token, user, account, profile });
      const { token, user, account, profile } = res;
      // console.log("response", res);
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  pages: {
    signIn: "/signin",
  },
};
