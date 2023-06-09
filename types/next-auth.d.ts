import "next-auth";
import "next-auth/jwt";

// declare module "next-auth" {
// //   /**
// //    * Returned by `useSession`, `getSession` and received as
// //    * a prop on the `SessionProvider` React Context
// //    */
//   interface Session {
//     token?: string;
//     user?: User;
//     expires?: string;
//   }

declare module "next-auth" {
  interface Session {
    user: User;
  }
  interface User {
    fullname: string | null;
    email: string | null;
    id: string;
    created_at?: string;
    updated_at?: string;
    token: string;
    image?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    refreshTokenExpires?: number;
    accessTokenExpires?: number;
    refreshToken?: string;
    user: User;
    exp?: number;
    iat?: number;
    jti?: string;
  }
}
