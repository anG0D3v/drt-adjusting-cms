import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
interface User {
  name: string;
  email: string;
}
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "password", type: "password" },
      },

      async authorize(credentials) {
        console.log(credentials);

        const { username, password } = credentials as any;
        const res = await fetch(`${process.env.DEV_API}/api/user/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        });
        const userResponse = await res.json();

        // const user = {
        //   username: userResponse?.user.username,
        //   email: userResponse?.user.email,
        //   status: userResponse?.user.status,
        // };

        if (res.ok && userResponse.user.username == username) {
          // const user: User = {
          //   name: userResponse.user.username,
          //   email: userResponse.user.email,
          // };
          return {
            id: userResponse.user.id,
            name: userResponse.user.id,
            email: userResponse.user.username,
          };
        } else {
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  // callbacks: {
  //   async jwt({ token, account, profile, user }) {
  //     // Persist the OAuth access_token and or the user id to the token right after signin

  //     if (account) {
  //       token.accessToken = account.access_token;
  //       token.id = user.id;
  //       token.username = user.username;
  //     }
  //     return token;
  //   },
  // },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
