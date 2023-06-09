import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {},
        password: {},
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
          return {
            ...data.user,
            token: data.token,
          };
        }
        return null;
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ account, profile, user }) {
      if (account?.provider === "google") {
        try {
          const data = await (
            await fetch("https://re-me-api.onrender.com/auth/google_oauth", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ token: account.id_token }),
            })
          ).json();

          user.token = data.token;
          user.id = data.user.id;
          user.email = data.user.email;
          user.fullname = data.user.fullname;
          user.created_at = data.user.created_at;
          user.updated_at = data.user.updated_at;
        } catch (error) {
          console.log(error);
          throw new Error("Error");
          // return "/signin";
        }
      }

      return true;
    },
    session: ({ session, token, user }) => {
      if (session?.user) {
        session.user = token.user;
      }

      return session;
    },
    jwt: ({ token, user, account, profile }) => {
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
