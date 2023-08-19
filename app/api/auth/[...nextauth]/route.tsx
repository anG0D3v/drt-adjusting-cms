import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import authOptions from "./auth";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
