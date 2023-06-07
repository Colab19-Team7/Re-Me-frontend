// declare module "next-auth" {
//   /**
//    * Returned by `useSession`, `getSession` and received as
//    * a prop on the `SessionProvider` React Context
//    */
//   interface Session {
//     token?: string;
//     user?: User;
//     expires?: string;
//   }

//   interface User {
//     fullName?: string | null;
//     email?: string | null;
//     id?: string;
//     created_at?: string;
//     updated_at?: string;
//     token?: string;
//   }
// }

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT {
//     refreshTokenExpires?: number;
//     accessTokenExpires?: number;
//     refreshToken?: string;
//     token: string;
//     exp?: number;
//     iat?: number;
//     jti?: string;
//   }
// }
